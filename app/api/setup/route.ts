import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const robloxGroupId = typeof body.robloxGroupId === "string" ? body.robloxGroupId.trim() : "";
  const accentColor = typeof body.accentColor === "string" ? body.accentColor : "#ff6f9d";
  const departmentNames = Array.isArray(body.departments)
    ? body.departments.filter((department: unknown): department is string => typeof department === "string")
      .map((department: string) => department.trim()).filter(Boolean)
    : [];

  if (!name || departmentNames.length === 0) {
    return NextResponse.json({ error: "A group name and at least one department are required." }, { status: 400 });
  }

  const existingConfig = await prisma.instanceConfig.findUnique({ where: { id: "instance" } });
  if (existingConfig?.setupComplete) {
    return NextResponse.json({ error: "This HireMe instance is already configured." }, { status: 409 });
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "group";
  const group = await prisma.communityGroup.create({
    data: {
      name,
      slug,
      description: description || null,
      robloxGroupId: robloxGroupId || null,
      accentColor: /^#[0-9a-f]{6}$/i.test(accentColor) ? accentColor : "#ff6f9d",
      instanceConfig: { create: { id: "instance", setupComplete: true } },
      departments: {
        create: departmentNames.map((department: string, index: number) => ({
          name: department,
          slug: `${department.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,
          accent: accentColor,
        })),
      },
    },
    select: { slug: true },
  });

  return NextResponse.json({ slug: group.slug }, { status: 201 });
}