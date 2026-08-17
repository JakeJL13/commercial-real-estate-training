import { CourseProvider } from "@/components/course/course-provider"
import { Platform } from "@/components/course/platform"

export default function Page() {
  return (
    <CourseProvider>
      <Platform />
    </CourseProvider>
  )
}
