import { glossaryTerms, type GlossaryTerm } from "@/lib/glossary-data"
import type { Lesson, KnowledgeCheckBlock, LessonBlock, MatchingBlock } from "@/lib/course-data"

/**
 * Build a Vocabulary Check lesson for the given module.
 *
 * Content is derived from glossaryTerms filtered by moduleId.
 * Includes a matching-pairs warm-up (term to short definition) plus a
 * multiple-choice quiz with distractors pulled from other modules' terms
 * (so wrong answers still sound plausible but come from a different unit).
 */
export function buildVocabLesson(moduleId: GlossaryTerm["moduleId"], moduleTitle: string): Lesson {
  const homeTerms = glossaryTerms.filter((t) => t.moduleId === moduleId)
  const otherTerms = glossaryTerms.filter((t) => t.moduleId !== moduleId)

  // Deterministic pseudo-random ordering keyed by moduleId so we do not
  // trigger hydration mismatches between server and client renders.
  const orderedHome = [...homeTerms].sort((a, b) => hash(moduleId + a.id) - hash(moduleId + b.id))
  const orderedOther = [...otherTerms].sort((a, b) => hash(moduleId + b.id) - hash(moduleId + a.id))

  // Matching pairs: up to 8 term -> short pairs
  const pairsCount = Math.min(8, orderedHome.length)
  const matching: MatchingBlock | null =
    pairsCount >= 3
      ? {
          kind: "matching",
          title: `Match the ${moduleId.toUpperCase()} term to its meaning`,
          pairs: orderedHome.slice(0, pairsCount).map((t) => ({
            term: t.term,
            match: t.short,
          })),
        }
      : null

  // Multiple choice: cover every home-module term, one question each,
  // capped at 10 to keep the check tight.
  const quizTerms = orderedHome.slice(0, 10)
  const knowledgeCheck: KnowledgeCheckBlock = {
    kind: "knowledge-check",
    title: `${moduleId.toUpperCase()} Vocabulary Check`,
    questions: quizTerms.map((t) => {
      // Pick 3 distractor definitions from other modules' terms. Deterministic
      // by hashing "moduleId + term id + i".
      const distractorPool = orderedOther.slice(0, 40)
      const distractors: string[] = []
      let i = 0
      while (distractors.length < 3 && i < distractorPool.length) {
        const candidate = distractorPool[(hash(moduleId + t.id + i) & 0x7fffffff) % distractorPool.length]
        if (!distractors.includes(candidate.short) && candidate.short !== t.short) {
          distractors.push(candidate.short)
        }
        i++
      }
      // Ensure we always have 3 distractors even in edge cases
      while (distractors.length < 3) {
        const filler = orderedOther[distractors.length]?.short ?? "None of the above"
        if (!distractors.includes(filler)) distractors.push(filler)
        else distractors.push(`Not a real definition (${distractors.length + 1})`)
      }
      // Insert the correct answer at a deterministic position (0-3)
      const correctPos = (hash(moduleId + t.id) & 0x7fffffff) % 4
      const options = [...distractors]
      options.splice(correctPos, 0, t.short)
      return {
        q: `Which best defines "${t.term}"?`,
        options,
        correct: correctPos,
        explain: t.long,
      }
    }),
  }

  const blocks: LessonBlock[] = [
    {
      kind: "prose",
      paragraphs: [
        `Every module in this bootcamp introduces new vocabulary. This check pulls the ${homeTerms.length} core terms from ${moduleTitle} and tests whether you can spot each definition on sight.`,
        "Start with the matching game to warm up, then run the multiple-choice quiz. Aim for 80% or better before moving to the next module. If you miss a term, jump to the AI Glossary in the sidebar and revisit the CRE example for that term.",
      ],
    },
  ]

  if (matching) blocks.push(matching)
  blocks.push(knowledgeCheck)

  blocks.push({
    kind: "callout",
    tone: "info",
    title: "Study path",
    body: `All ${moduleId.toUpperCase()} terms live in the AI Glossary with a full definition, expanded explanation, and a CRE example. Use the module filter on the glossary page to focus on just this unit.`,
  })

  return {
    id: `${moduleId}vocab`,
    title: `${moduleId.toUpperCase()} Vocabulary Check`,
    type: "assessment",
    duration: 8,
    summary: `Test yourself on the ${homeTerms.length} vocabulary terms introduced in ${moduleTitle}. Matching game + multiple-choice quiz.`,
    content: [
      `This is the vocabulary check for ${moduleTitle}. It covers ${homeTerms.length} terms and takes about 8 minutes.`,
    ],
    keyTakeaways: [
      "Vocabulary is the shortest lever on comprehension: knowing the term buys you the concept.",
      "Miss a question? The AI Glossary has the full CRE example for every term.",
      "Aim for 80%+ before advancing to the next module.",
    ],
    blocks,
  }
}

/** Cheap deterministic hash used for stable ordering / distractor selection. */
function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h
}
