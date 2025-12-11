"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });


const CONTAINER_WIDTH = 1200; 
const CONTAINER_HEIGHT = 580; 

const ArrowSvg = ({ styleClass = "", w = 120, h = 60 }) => (
  <svg
    viewBox="0 0 200 100"
    width={w}
    height={h}
    aria-hidden="true"
    style={{ overflow: "visible", pointerEvents: "none" }}
  >
    <path
      d="M10,70 Q70,10 160,40"
      stroke="#6b3f32"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M150,34 L160,40 L148,48" stroke="#6b3f32" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

const SapBrace = ({ width = CONTAINER_WIDTH * 0.6 }) => (
  <svg viewBox="0 0 800 120" style={{ width: "100%", height: "72px", overflow: "visible" }} aria-hidden="true">
    <path
      d="M10,30 C100,60 240,60 360,60 C420,60 480,110 520,110 C560,110 620,60 790,30"
      stroke="#5a4036"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const apps = [
  { name: "Accounting", icon: "/icons/icon1.svg", competitor: "Quickbooks", x: 80, y: 36, arrow: { tx: -56, ty: -56, rot: -20 }, labelOffset: { lx: -54, ly: -84 } },
  { name: "Knowledge", icon: "/icons/icon2.svg", competitor: "Notion", x: 235, y: 36, arrow: { tx: -52, ty: -62, rot: -15 }, labelOffset: { lx: -40, ly: -92 } },
  { name: "Sign", icon: "/icons/icon3.svg", competitor: "DocuSign", x: 395, y: 36, arrow: { tx: 0, ty: -64, rot: 0 }, labelOffset: { lx: -12, ly: -98 } },
  { name: "CRM", icon: "/icons/icon4.svg", competitor: "Salesforce", x: 555, y: 36, arrow: { tx: 36, ty: -54, rot: 18 }, labelOffset: { lx: 36, ly: -88 } },
  { name: "Studio", icon: "/icons/icon5.svg", competitor: "Power Apps", x: 715, y: 36, arrow: { tx: 46, ty: -56, rot: 20 }, labelOffset: { lx: 68, ly: -88 } },
  { name: "Subscriptions", icon: "/icons/icon6.svg", competitor: "Chargebee", x: 875, y: 36, arrow: { tx: 54, ty: -46, rot: 12 }, labelOffset: { lx: 86, ly: -82 } },

  { name: "Rental", icon: "/icons/icon7.svg", competitor: "", x: 80, y: 156, arrow: null, labelOffset: null },
  { name: "Point of Sale", icon: "/icons/icon8.svg", competitor: "Lightspeed", x: 235, y: 156, arrow: { tx: -44, ty: -62, rot: -18 }, labelOffset: { lx: -40, ly: -92 } },
  { name: "Discuss", icon: "/icons/icon9.svg", competitor: "Slack", x: 395, y: 156, arrow: { tx: 10, ty: -66, rot: -12 }, labelOffset: { lx: -2, ly: -92 } },
  { name: "Documents", icon: "/icons/icon10.svg", competitor: "Box", x: 555, y: 156, arrow: { tx: 46, ty: -56, rot: 18 }, labelOffset: { lx: 52, ly: -88 } },
  { name: "Project", icon: "/icons/icon11.svg", competitor: "Asana", x: 715, y: 156, arrow: { tx: 18, ty: -88, rot: 10 }, labelOffset: { lx: 22, ly: -116 } },
  { name: "Timesheets", icon: "/icons/icon12.svg", competitor: "Harvest", x: 875, y: 156, arrow: { tx: 72, ty: -14, rot: 10 }, labelOffset: { lx: 86, ly: -34 } },

  { name: "Field Service", icon: "/icons/icon13.svg", competitor: "Service cloud", x: 80, y: 276, arrow: { tx: -86, ty: -14, rot: -8 }, labelOffset: { lx: -144, ly: -38 } },
  { name: "Planning", icon: "/icons/icon14.svg", competitor: "Monday.com", x: 235, y: 276, arrow: { tx: -36, ty: -78, rot: -12 }, labelOffset: { lx: -40, ly: -100 } },
  { name: "Helpdesk", icon: "/icons/icon15.svg", competitor: "Zendesk", x: 395, y: 276, arrow: { tx: -8, ty: -8, rot: 20 }, labelOffset: { lx: -6, ly: -8 } },
  { name: "Website", icon: "/icons/icon16.svg", competitor: "shopify", x: 555, y: 276, arrow: { tx: 48, ty: -44, rot: 14 }, labelOffset: { lx: 48, ly: -74 } },
  { name: "Social Marketing", icon: "/icons/icon17.svg", competitor: "Hootsuite", x: 715, y: 276, arrow: { tx: 30, ty: -88, rot: 6 }, labelOffset: { lx: 30, ly: -118 } },
  { name: "Email Marketing", icon: "/icons/icon18.svg", competitor: "Hubspot", x: 875, y: 276, arrow: { tx: 72, ty: -18, rot: 8 }, labelOffset: { lx: 90, ly: -44 } },

  // fourth row: SAP group
  { name: "Purchase", icon: "/icons/icon19.svg", competitor: "", x: 80, y: 372, arrow: null, labelOffset: null },
  { name: "Inventory", icon: "/icons/icon20.svg", competitor: "", x: 235, y: 372, arrow: null, labelOffset: null },
  { name: "Manufacturing", icon: "/icons/icon21.svg", competitor: "", x: 395, y: 372, arrow: null, labelOffset: null },
  { name: "Sales", icon: "/icons/icon22.svg", competitor: "", x: 555, y: 372, arrow: null, labelOffset: null },

  // right two
  { name: "HR", icon: "/icons/icon23.svg", competitor: "BambooHR", x: 715, y: 372, arrow: { tx: 46, ty: -44, rot: 12 }, labelOffset: { lx: 84, ly: -74 } },
  { name: "Dashboard", icon: "/icons/icon24.svg", competitor: "Tableau", x: 875, y: 372, arrow: { tx: 54, ty: -48, rot: 6 }, labelOffset: { lx: 84, ly: -78 } },
];

const ICON_SIZE = 84;
const ICON_INNER = 56;

export default function OdooComparison() {
  const [isWithOdoo, setIsWithOdoo] = useState(false);

  const xPositions = apps.map((a) => a.x);
  const minX = Math.min(...xPositions);
  const maxX = Math.max(...xPositions);
  const currentCenter = (minX + maxX) / 2;
  const centerOffset = Math.round(CONTAINER_WIDTH / 2 - currentCenter);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "28px",
        paddingBottom: "56px",
        background: "#fff",
      }}
    >
      <div
        style={{
          width: CONTAINER_WIDTH,
          minHeight: CONTAINER_HEIGHT + 200,
          position: "relative",
          boxSizing: "border-box",
          padding: "24px 16px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: CONTAINER_WIDTH,
            height: CONTAINER_HEIGHT,
            margin: "0 auto",
          }}
        >
          {apps.map((app, idx) => {
            const centerX = app.x;
            const centerY = app.y;
            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: centerX + centerOffset,
                  top: centerY,
                  width: ICON_SIZE,
                  height: ICON_SIZE + 32, // leave space for name
                  transform: `translate(-50%, 0)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  zIndex: 20,
                }}
              >
                <div
                  style={{
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                    borderRadius: 14,
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.04)",
                    boxShadow: "0 6px 30px rgba(16,24,40,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={app.icon}
                    alt={app.name}
                    width={ICON_INNER}
                    height={ICON_INNER}
                    style={{ width: ICON_INNER, height: ICON_INNER, objectFit: "contain" }}
                    priority
                  />
                </div>

                <div style={{ marginTop: 8, textAlign: "center", color: "#374151", fontSize: 13 }}>
                  {app.name}
                </div>

                <AnimatePresence>
                  {isWithOdoo && app.competitor && app.arrow && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.28, delay: idx * 0.02 }}
                        style={{
                          position: "absolute",
                          left: app.arrow.tx + ICON_SIZE / 2,
                          top: app.arrow.ty + ICON_SIZE / 2,
                          transform: `translate(-50%, -50%) rotate(${app.arrow.rot}deg)`,
                          zIndex: 8,
                          pointerEvents: "none",
                        }}
                      >
                        <ArrowSvg w={130} h={72} />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.28, delay: idx * 0.03 }}
                        style={{
                          position: "absolute",
                          left: (app.labelOffset?.lx ?? 0) + ICON_SIZE / 2,
                          top: (app.labelOffset?.ly ?? -84) + ICON_SIZE / 2,
                          transform: "translate(-50%, -50%)",
                          zIndex: 9,
                          whiteSpace: "nowrap",
                        }}
                        className={caveat.className}
                      >
                        <span style={{ fontSize: 24, color: "#5a3f36", letterSpacing: -0.6 }}>{app.competitor}</span>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <AnimatePresence>
            {isWithOdoo && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35, delay: 0.25 }}
                style={{
                  position: "absolute",
                  left: "8%",
                  top: 436,
                  width: CONTAINER_WIDTH * 0.84,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pointerEvents: "none",
                  zIndex: 6,
                }}
              >
                <div style={{ width: "72%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <SapBrace />
                  <div style={{ marginTop: 6, fontSize: 30, color: "#5a3f36", fontWeight: 600, fontStyle: "italic" }}>SAP</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          style={{
            marginTop: 26,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            padding: "0 6%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                background: "#fff",
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
                borderRadius: 9999,
                boxShadow: "0 12px 30px rgba(34, 30, 30, 0.06)",
                border: "1px solid rgba(0,0,0,0.04)",
                zIndex: 40,
              }}
            >
              <button
                onClick={() => setIsWithOdoo((s) => !s)}
                aria-pressed={isWithOdoo}
                style={{
                  width: 58,
                  height: 32,
                  borderRadius: 9999,
                  padding: 6,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "none",
                  background: isWithOdoo ? "#a855f7" : "#e6e6e6",
                }}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 600, damping: 32 }}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: "0 6px 18px rgba(99, 62, 183, 0.12)",
                    marginLeft: isWithOdoo ? "auto" : 0,
                    marginRight: isWithOdoo ? 0 : "auto",
                  }}
                />
              </button>

              <span style={{ fontSize: 15, color: "#6b3f36", fontWeight: 600 }}>Imagine without odoo</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <span style={{ fontSize: 16, color: "#0ea5a4", fontWeight: 700 }}>View all Apps</span>
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7H20" stroke="#0ea5a4" strokeWidth="2" strokeLinecap="round" />
              <path d="M14 1L20 7L14 13" stroke="#0ea5a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
