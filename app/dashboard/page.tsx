"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Project {
  _id: string;
  name: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async () => {
    if (!newProjectName.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: newProjectName }),
      });

      if (!res.ok) {
        console.error("Failed to create project");
        return;
      }

      const created: Project = await res.json();
      setProjects((prev) => [...prev, created]);
      setNewProjectName("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setProjects((p) => p.filter((project) => project._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">📁 Dashboard</h1>

        {/* Add project */}
        <div className="mb-6 flex gap-2">
          <input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="New project name"
            className="flex-1 rounded-md border px-3 py-2"
          />
          <button
            onClick={addProject}
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Add
          </button>
        </div>

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
                  onClick={() => deleteProject(project._id)}
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
