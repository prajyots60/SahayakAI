"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  NavLink,
  Paper,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import { ChevronsLeft, ChevronsRight, Sparkles } from "lucide-react";

import { dashboardNavSections } from "./nav-data";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Keep widths in one place
  const EXPANDED_WIDTH = 240; // px (w-60)
  const COLLAPSED_WIDTH = 72; // px (w-[72px])

  const asideClassName = [
    // Fixed, full-height sidebar on xl+ screens
    "hidden xl:flex fixed inset-y-0 left-0 z-40 transition-all duration-300",
    // Slim widths
    collapsed ? "w-[72px]" : "w-60",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Offset page content so it doesn't sit underneath the fixed sidebar (xl and up)
  useEffect(() => {
    const applyOffset = () => {
      const xl = window.matchMedia("(min-width: 1280px)").matches; // Tailwind's xl breakpoint
      const width = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
      if (xl) {
        document.documentElement.style.setProperty(
          "--sidebar-width",
          `${width}px`
        );
        document.body.style.paddingLeft = `${width}px`;
      } else {
        document.documentElement.style.setProperty("--sidebar-width", "0px");
        document.body.style.paddingLeft = "";
      }
    };

    applyOffset();
    window.addEventListener("resize", applyOffset);
    return () => {
      window.removeEventListener("resize", applyOffset);
      document.documentElement.style.removeProperty("--sidebar-width");
      document.body.style.paddingLeft = "";
    };
  }, [collapsed]);

  return (
    <aside className={asideClassName}>
      <Paper
        withBorder
        shadow="xl"
        radius={24}
        p={collapsed ? "sm" : "md"}
        style={{
          background: "rgba(255, 255, 255, 0.94)",
          borderColor: "rgba(16, 185, 129, 0.25)",
          boxShadow: "0 24px 40px -24px rgba(13, 148, 136, 0.45)",
          backdropFilter: "blur(12px)",
          height: "100vh",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: collapsed ? "center" : undefined,
        }}
        className="w-full"
      >
        <Stack gap={collapsed ? "sm" : "md"} className="h-full">
          <Group
            justify={collapsed ? "center" : "space-between"}
            align="center"
            w="100%"
          >
            <Group gap={collapsed ? 0 : "sm"} align="center">
              <Box
                style={{
                  background: "linear-gradient(135deg, #10b981, #0f766e)",
                  color: "white",
                  fontWeight: 700,
                  width: collapsed ? 36 : 40,
                  height: collapsed ? 36 : 40,
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  letterSpacing: "0.08em",
                }}
              >
                SA
              </Box>
              {!collapsed && (
                <Stack gap={2} justify="center">
                  <Text size="sm" fw={600} c="dark.6">
                    SahayakAI
                  </Text>
                  <Text size="xs" c="dimmed">
                    business co-pilot
                  </Text>
                </Stack>
              )}
            </Group>
            <Group gap="xs" align="center">
              {!collapsed && (
                <Badge
                  color="teal"
                  variant="light"
                  radius="xl"
                  size="xs"
                  tt="uppercase"
                  fw={600}
                >
                  Live
                </Badge>
              )}
              <Tooltip
                label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                position="right"
                withArrow
              >
                <ActionIcon
                  variant="light"
                  color="teal"
                  radius="xl"
                  size="md"
                  onClick={() => setCollapsed((prev) => !prev)}
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {collapsed ? (
                    <ChevronsRight size={16} strokeWidth={1.6} />
                  ) : (
                    <ChevronsLeft size={16} strokeWidth={1.6} />
                  )}
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>

          <ScrollArea style={{ flex: 1 }} type="auto" w="100%">
            <Stack
              gap={collapsed ? "sm" : "md"}
              pb={collapsed ? "sm" : "md"}
              align={collapsed ? "center" : undefined}
            >
              {dashboardNavSections.map((section) => (
                <Stack
                  key={section.title}
                  gap="xs"
                  align={collapsed ? "center" : undefined}
                >
                  {!collapsed && (
                    <Text
                      size="xs"
                      fw={600}
                      tt="uppercase"
                      c="teal.5"
                      style={{ letterSpacing: "0.28em" }}
                    >
                      {section.title}
                    </Text>
                  )}
                  <Stack gap="xs" align={collapsed ? "center" : undefined}>
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const baseHref = item.href.split("#")[0];
                      const isActive = pathname === baseHref;

                      if (collapsed) {
                        return (
                          <Tooltip
                            key={item.label}
                            label={item.label}
                            position="right"
                            withArrow
                          >
                            <ActionIcon
                              component={Link}
                              href={item.href}
                              size="lg"
                              radius="xl"
                              variant={isActive ? "filled" : "light"}
                              color="teal"
                              style={{
                                boxShadow: isActive
                                  ? "0 18px 26px -18px rgba(13, 148, 136, 0.55)"
                                  : undefined,
                              }}
                              aria-label={item.label}
                            >
                              <Icon size={16} strokeWidth={1.6} />
                            </ActionIcon>
                          </Tooltip>
                        );
                      }

                      return (
                        <NavLink
                          key={item.label}
                          component={Link}
                          href={item.href}
                          label={item.label}
                          // Hide description to enforce uniform row heights
                          description={undefined}
                          active={isActive}
                          leftSection={
                            <ThemeIcon
                              radius="xl"
                              size={30}
                              variant={isActive ? "filled" : "light"}
                              color="teal"
                            >
                              <Icon size={14} strokeWidth={1.6} />
                            </ThemeIcon>
                          }
                          rightSection={
                            item.status ? (
                              <Badge
                                color="teal"
                                variant="light"
                                radius="xl"
                                size="xs"
                                tt="uppercase"
                                fw={600}
                                style={{ minWidth: 34, textAlign: "center" }}
                              >
                                {item.status}
                              </Badge>
                            ) : undefined
                          }
                          className={`rounded-xl border px-2 transition-all ${
                            isActive
                              ? "border-teal-300 bg-emerald-50 shadow-lg"
                              : "border-transparent hover:border-teal-200/70 hover:bg-emerald-50/60 hover:shadow"
                          }`}
                          classNames={{
                            root: "h-11 items-center",
                            label:
                              "text-[13px] font-semibold text-slate-900 truncate",
                            description: "hidden",
                          }}
                        />
                      );
                    })}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
      </Paper>
    </aside>
  );
}

export default Sidebar;
