import Editor from "@/components/Editor";

export default async function Page({ params }) {
  const user = await getCurrentUser();

  // Ensure this workspace belongs to the user
  const workspace = await getWorkspace({
    id: params.workspaceId,
    userId: user.id,
  });

  if (!workspace) notFound();

  return <WorkspaceEditor workspaceId={workspace.id} />;
}
