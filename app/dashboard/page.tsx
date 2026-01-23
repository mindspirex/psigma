"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [projects, setProjects] = useState<string[]>([]);
  const [name, setName] = useState("");
  const router = useRouter();

  const addProject = () => {
    if (!name.trim()) return;

    setProjects([...projects, name]);
    setName("");
  };

  const deleteProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">📁 Dashboard</h1>

        {/* Add Project */}
        <div className="mb-6 flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addProject}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Project List */}
        {projects.length === 0 && (
          <p className="text-gray-500">No projects yet.</p>
        )}

        <div className="space-y-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
            >
              <span className="font-medium">{project}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/projects/${index}`)}
                  className="rounded-md bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                >
                  Open
                </button>
                <button
                  onClick={() => deleteProject(index)}
                  className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
