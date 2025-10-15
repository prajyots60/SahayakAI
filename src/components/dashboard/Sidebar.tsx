"use client";

import { useState } from "react";
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

  const asideClassName = [
    "hidden xl:flex flex-none sticky top-8 self-start transition-all duration-300",
    collapsed ? "w-[84px]" : "w-72",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={asideClassName}>
      <Paper
        withBorder
        shadow="xl"
        radius={collapsed ? 28 : 32}
        p={collapsed ? "md" : "lg"}
        style={{
          background: "rgba(255, 255, 255, 0.94)",
          borderColor: "rgba(16, 185, 129, 0.25)",
          boxShadow: "0 24px 40px -24px rgba(13, 148, 136, 0.45)",
          backdropFilter: "blur(12px)",
          height: "calc(100vh - 5rem)",
          maxHeight: "calc(100vh - 5rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: collapsed ? "center" : undefined,
        }}
        className="w-full"
      >
        <Stack gap={collapsed ? "md" : "lg"} className="h-full">
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
                  width: collapsed ? 40 : 44,
                  height: collapsed ? 40 : 44,
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
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
                  size="lg"
                  onClick={() => setCollapsed((prev) => !prev)}
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {collapsed ? (
                    <ChevronsRight size={18} strokeWidth={1.8} />
                  ) : (
                    <ChevronsLeft size={18} strokeWidth={1.8} />
                  )}
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>

          <ScrollArea
            style={{ flex: 1 }}
            offsetScrollbars
            type="hover"
            w="100%"
          >
            <Stack
              gap={collapsed ? "lg" : "xl"}
              pb={collapsed ? "md" : "lg"}
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
                              size="xl"
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
                              <Icon size={18} strokeWidth={1.7} />
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
                          description={item.description}
                          active={isActive}
                          leftSection={
                            <ThemeIcon
                              radius="xl"
                              size={36}
                              variant={isActive ? "filled" : "light"}
                              color="teal"
                            >
                              <Icon size={16} strokeWidth={1.7} />
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
                              >
                                {item.status}
                              </Badge>
                            ) : undefined
                          }
                          className={`rounded-3xl border px-3 py-3 transition-all ${
                            isActive
                              ? "border-teal-300 bg-emerald-50 shadow-lg"
                              : "border-transparent hover:border-teal-200/70 hover:bg-emerald-50/60 hover:shadow"
                          }`}
                          classNames={{
                            label: "text-sm font-semibold text-slate-900",
                            description: "text-xs text-slate-500",
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
