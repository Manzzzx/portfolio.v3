import React from 'react';
import { 
  FaReact, 
  FaGitAlt,
  FaPython,
  FaGithub,
  FaDocker,
} from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript, 
  SiFigma,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiPrisma,
  SiPostman,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

interface SkillCardProps {
  title: string;
  borderColor: string;
  titleColor: string;
  children: React.ReactNode;
}

interface SkillItemProps {
  icon: React.ReactNode;
  label: string;
  link: string;
  hoverColor?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, borderColor, titleColor, children }) => (
  <div className={`rounded-2xl border ${borderColor} p-6 bg-[#101c2c]/40 backdrop-blur-md h-full`}>
    <h3 className={`text-lg font-bold ${titleColor} mb-6 flex items-center gap-2`}>
      {title}
      <span className="text-xs">❄️</span>
    </h3>
    <div className="flex flex-wrap gap-4 justify-start">
      {children}
    </div>
  </div>
);

const SkillItem: React.FC<SkillItemProps> = ({ icon, label, link, hoverColor = "hover:scale-110" }) => (
  <div className="group cursor-pointer">
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
      title={`Visit ${label} website`}
    >
      <div className={`text-4xl transition-all duration-300 transform ${hoverColor} drop-shadow-lg`}>
        {icon}
      </div>
    </a>
  </div>
);

export default function SkillsGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Frontend*/}
        <SkillCard
          title="Frontend"
          borderColor="border-[#8dd8ff]"
          titleColor="text-[#8dd8ff]"
        >
          <SkillItem
            icon={<FaReact className="text-[#61DAFB]" />}
            label="React"
            link="https://react.dev"
          />
          <SkillItem
            icon={<SiNextdotjs className="text-black bg-white rounded-full" />}
            label="Next.js"
            link="https://nextjs.org"
          />
          <SkillItem
            icon={<SiTailwindcss className="text-[#06B6D4]" />}
            label="Tailwind CSS"
            link="https://tailwindcss.com"
          />
          <SkillItem
            icon={<SiTypescript className="text-[#3178C6]" />}
            label="TypeScript"
            link="https://www.typescriptlang.org"
          />
          <SkillItem
            icon={<SiJavascript className="text-[#F7DF1E] bg-black rounded" />}
            label="JavaScript"
            link="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
          />
        </SkillCard>

        {/* Backend */}
        <SkillCard
          title="Backend"
          borderColor="border-[#8dd8ff]"
          titleColor="text-[#8dd8ff]"
        >
          <SkillItem
            icon={<SiNodedotjs className="text-[#339933]" />}
            label="Node.js"
            link="https://nodejs.org"
          />
          <SkillItem
            icon={<SiExpress className="text-[#000000] bg-white rounded p-1" />}
            label="Express.js"
            link="https://expressjs.com"
          />
          <SkillItem
            icon={<FaPython className="text-[#3776AB]" />}
            label="Python"
            link="https://www.python.org"
          />
        </SkillCard>

        {/* Database */}
        <SkillCard
          title="Database"
          borderColor="border-[#8dd8ff]"
          titleColor="text-[#8dd8ff]"
        >
          <SkillItem
            icon={<SiMongodb className="text-[#47A248]" />}
            label="MongoDB"
            link="https://www.mongodb.com"
          />
          <SkillItem
            icon={<SiMysql className="text-[#4479A1]" />}
            label="MySQL"
            link="https://www.mysql.com"
          />
          <SkillItem
            icon={<SiPrisma className="text-[#2D3748]" />}
            label="Prisma ORM"
            link="https://www.prisma.io"
          />
        </SkillCard>

        {/* Tools & DevOps */}
        <SkillCard
          title="Tools & DevOps"
          borderColor="border-[#8dd8ff]"
          titleColor="text-[#8dd8ff]"
        >
          <SkillItem
            icon={<FaGithub className="text-[#181717] bg-white rounded-full" />}
            label="GitHub"
            link="https://github.com"
          />
          <SkillItem
            icon={<FaGitAlt className="text-[#F05032]" />}
            label="Git"
            link="https://git-scm.com"
          />
          <SkillItem
            icon={<VscVscode className="w-10 h-10 rounded-lg flex items-center justify-center text-[#007ACC] font-bold text-xs">
              VS
            </VscVscode>}
            label="VS Code"
            link="https://code.visualstudio.com"
          />
          <SkillItem
            icon={<FaDocker className="text-[#2496ED]" />}
            label="Docker"
            link="https://www.docker.com"
          />
          <SkillItem
            icon={<SiPostman className="text-[#FF6C37]" />}
            label="Postman"
            link="https://www.postman.com"
          />
          <SkillItem
            icon={<SiFigma className="text-[#F24E1E]" />}
            label="Figma"
            link="https://www.figma.com"
          />
        </SkillCard>
      </div>
    </div>
  );
}