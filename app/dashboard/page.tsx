"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Project {
  _id: string;
  name: string;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects", {
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Failed to fetch projects");
          return;
        }

        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">📁 Dashboard</h1>

        {projects.length === 0 && (
          <p className="text-gray-500">No projects yet.</p>
        )}

        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
            >
              <span className="font-medium">{project.name}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/projects/${project._id}`)}
                  className="rounded-md bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                >
                  Open
                </button>

                <button
                  className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                  disabled
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
