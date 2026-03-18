"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EducationTab } from "./education-tab";
import { ExperienceTab } from "./experience-tab";
import { PersonalInfoTab } from "./personal-info-tab";
import { SkillsTab } from "./skills-tab";

const triggerStyles =
  "h-11 rounded-none border-b-2 border-transparent px-2 text-[1.03rem] font-semibold text-zinc-500 data-[state=active]:border-zinc-900 data-[state=active]:text-zinc-900";

export function ResumeDataTabs() {
  return (
    <Tabs defaultValue="personal-info" className="w-full gap-5">
      <TabsList
        className="grid h-auto w-full grid-cols-4 rounded-none border-b border-zinc-200 bg-transparent p-0"
        variant="line"
      >
        <TabsTrigger value="personal-info" className={triggerStyles}>
          Personal Info
        </TabsTrigger>
        <TabsTrigger value="education" className={triggerStyles}>
          Education
        </TabsTrigger>
        <TabsTrigger value="experience" className={triggerStyles}>
          Experience
        </TabsTrigger>
        <TabsTrigger value="skills" className={triggerStyles}>
          Skills
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal-info" className="pt-0">
        <PersonalInfoTab />
      </TabsContent>

      <TabsContent value="education" className="pt-0">
        <EducationTab />
      </TabsContent>

      <TabsContent value="experience" className="pt-0">
        <ExperienceTab />
      </TabsContent>

      <TabsContent value="skills" className="pt-0">
        <SkillsTab />
      </TabsContent>
    </Tabs>
  );
}
