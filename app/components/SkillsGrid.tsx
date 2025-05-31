import { FaReact, FaJs, FaCss3Alt, FaHtml5, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

export default function SkillsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
      <div className="flex flex-col items-center group">
        <FaReact size={40} className="text-blue-200 group-hover:text-cyan-100 transition drop-shadow-lg" />
        <span className="mt-2 text-blue-100/90 font-medium">React</span>
      </div>
      <div className="flex flex-col items-center group">
        <SiNextdotjs size={40} className="text-blue-100 group-hover:text-cyan-100 transition drop-shadow-lg" />
        <span className="mt-2 text-blue-100/90 font-medium">Next.js</span>
      </div>
      <div className="flex flex-col items-center group">
        <SiTailwindcss size={40} className="text-blue-200 group-hover:text-cyan-100 transition drop-shadow-lg" />
        <span className="mt-2 text-blue-100/90 font-medium">Tailwind</span>
      </div>
      <div className="flex flex-col items-center group">
        <SiTypescript size={40} className="text-blue-200 group-hover:text-cyan-100 transition drop-shadow-lg" />
        <span className="mt-2 text-blue-100/90 font-medium">TypeScript</span>
      </div>
      <div className="flex flex-col items-center group">
        <FaJs size={40} className="text-blue-100 group-hover:text-cyan-100 transition drop-shadow-lg" />
        <span className="mt-2 text-blue-100/90 font-medium">JavaScript</span>
      </div>
      <div className="flex flex-col items-center group">
        <FaNodeJs size={40} className="text-blue-100 group-hover:text-cyan-100 transition drop-shadow-lg" />
        <span className="mt-2 text-blue-100/90 font-medium">Node.js</span>
      </div>
      <div className="flex flex-col items-center group">
        <FaHtml5 size={40} className="text-blue-100 group-hover:text-cyan-100 transition drop-shadow-lg" />
        <span className="mt-2 text-blue-100/90 font-medium">HTML5</span>
      </div>
      <div className="flex flex-col items-center group">
        <FaCss3Alt size={40} className="text-blue-100 group-hover:text-cyan-100 transition drop-shadow-lg" />
        <span className="mt-2 text-blue-100/90 font-medium">CSS3</span>
      </div>
    </div>
  );
} 