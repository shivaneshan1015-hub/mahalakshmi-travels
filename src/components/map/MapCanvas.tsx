/**
 * MAHALAKSHMI TOUR & TRAVEL — ACCURATE SOUTH INDIA CARTOGRAPHIC MAP CANVAS
 * Ultra-crisp architectural silhouette of Peninsular South India.
 * Features:
 * - Geographically accurate state boundaries (Tamil Nadu, Kerala, Karnataka, Andhra Pradesh + Sri Lanka)
 * - Western Ghats & Eastern Ghats topographical mountain shading & river corridors
 * - Madurai Central Origin Hub with pulsating beacon & golden rings
 * - Dynamic Highway Corridors radiating from Madurai (NH 44, NH 85, NH 87, NH 181, NH 275, NH 38)
 * - Animated glowing route trajectory upon selecting any destination
 * - Elegant, non-overlapping destination badges with category icons & distance indicators
 * - Cartographic latitude/longitude graticules, ocean contour waves & compass rose
 */

'use client';

import React, { useState } from 'react';
import { MapNode, StateFilterId } from '@/types/map';
import { southIndiaMapData } from '@/lib/data/map';

interface MapCanvasProps {
  selectedNodeId: string;
  activeStateFilter: StateFilterId;
  onSelectNode: (node: MapNode) => void;
}

export function MapCanvas({
  selectedNodeId,
  activeStateFilter,
  onSelectNode,
}: MapCanvasProps) {
  const { nodes, routes } = southIndiaMapData;
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const activeRoute = routes.find(
    (r) => r.fromNodeId === 'madurai' && r.toNodeId === selectedNodeId
  );

  // Filter visible nodes based on activeStateFilter
  const isNodeVisible = (node: MapNode) => {
    if (node.isOrigin) return true;
    if (activeStateFilter === 'all') return true;
    return node.stateSlug === activeStateFilter;
  };

  // Cartographically Accurate SVG Geometries for Peninsular South India
  const stateGeometries = {
    tamilNadu: `
      M 407 904
      C 425 892, 455 865, 480 840
      C 495 825, 510 818, 520 812
      C 535 808, 550 808, 555 810
      C 550 814, 530 816, 520 812
      C 510 800, 515 780, 535 772
      C 555 765, 565 745, 570 720
      C 572 680, 575 640, 576 600
      C 578 560, 580 530, 581 518
      C 580 500, 560 505, 530 515
      C 495 525, 460 535, 425 545
      C 412 565, 395 590, 380 610
      C 365 625, 355 635, 353 647
      C 358 668, 365 685, 370 700
      C 378 720, 385 735, 395 745
      C 388 755, 382 770, 383 787
      C 386 815, 392 840, 395 865
      C 398 885, 402 898, 407 904
      Z
    `,
    kerala: `
      M 407 904
      C 398 885, 392 840, 383 787
      C 382 770, 388 755, 395 745
      C 385 735, 378 720, 370 700
      C 365 685, 358 668, 353 647
      C 345 635, 330 615, 310 595
      C 290 580, 275 572, 270 570
      C 278 595, 290 625, 305 655
      C 318 685, 324 715, 325 745
      C 326 762, 330 780, 335 800
      C 342 825, 352 850, 365 870
      C 380 890, 395 900, 407 904
      Z
    `,
    karnataka: `
      M 270 570
      C 275 572, 290 580, 310 595
      C 330 615, 345 635, 353 647
      C 365 625, 380 610, 395 590
      C 412 565, 420 550, 425 545
      C 438 520, 435 480, 430 440
      C 425 400, 415 360, 412 320
      C 408 280, 398 240, 385 200
      C 360 215, 320 230, 280 245
      C 250 260, 230 275, 220 280
      C 205 315, 200 355, 205 400
      C 210 440, 220 480, 230 515
      C 240 540, 255 558, 270 570
      Z
    `,
    andhraPradesh: `
      M 581 518
      C 580 500, 560 505, 530 515
      C 495 525, 460 535, 425 545
      C 438 520, 435 480, 430 440
      C 425 400, 415 360, 412 320
      C 408 280, 398 240, 385 200
      C 415 210, 450 230, 490 245
      C 530 260, 570 258, 610 252
      C 650 245, 690 220, 730 185
      C 760 160, 790 135, 815 115
      C 795 145, 770 180, 745 215
      C 715 250, 680 285, 650 320
      C 625 355, 608 395, 598 435
      C 590 465, 585 495, 581 518
      Z
    `,
    sriLanka: `
      M 555 835
      C 540 860, 535 895, 530 930
      C 535 965, 555 985, 580 985
      C 610 980, 630 945, 635 910
      C 638 875, 620 845, 595 830
      C 580 822, 565 825, 555 835
      Z
    `,
  };

  return (
    <div className="relative aspect-[1/1] max-w-[660px] mx-auto w-full select-none overflow-hidden my-1">
      <svg
        viewBox="160 110 680 880"
        className="w-full h-full drop-shadow-xs overflow-visible"
        aria-label="Geographically Accurate South India Tour Map"
      >
        <defs>
          <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#171716" floodOpacity="0.16" />
          </filter>
          <filter id="activeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#A65F43" floodOpacity="0.4" />
          </filter>
          <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#A65F43" floodOpacity="0.5" />
          </filter>

          <linearGradient id="oceanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5F1E8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ECE6D8" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <rect x="150" y="100" width="700" height="900" fill="url(#oceanGlow)" opacity="0.35" />

        <g stroke="rgba(23, 23, 22, 0.05)" strokeWidth="0.8" strokeDasharray="3 4">
          <line x1="160" y1="250" x2="840" y2="250" />
          <line x1="160" y1="450" x2="840" y2="450" />
          <line x1="160" y1="650" x2="840" y2="650" />
          <line x1="160" y1="850" x2="840" y2="850" />
          <line x1="300" y1="110" x2="300" y2="990" />
          <line x1="500" y1="110" x2="500" y2="990" />
          <line x1="700" y1="110" x2="700" y2="990" />
        </g>

        <g fontSize="7.5" fontFamily="var(--font-mono)" fill="rgba(23, 23, 22, 0.25)" letterSpacing="0.08em">
          <text x="168" y="254">16° N</text>
          <text x="168" y="454">14° N</text>
          <text x="168" y="654">12° N</text>
          <text x="168" y="854">10° N</text>
          <text x="304" y="125">76° E</text>
          <text x="504" y="125">78° E</text>
          <text x="704" y="125">80° E</text>
        </g>

        <g fill="none" stroke="rgba(23, 23, 22, 0.08)" strokeWidth="0.75" strokeDasharray="4 6">
          <path d="M 205 270 C 190 350, 195 450, 220 540 C 255 630, 305 750, 395 915" />
          <path d="M 830 105 C 750 200, 680 320, 615 480 C 595 600, 580 720, 545 835" />
        </g>

        <g id="landmass-group">
          <path
            d={stateGeometries.sriLanka}
            fill="#E5DFD1"
            stroke="rgba(23, 23, 22, 0.2)"
            strokeWidth="1"
            strokeDasharray="2 3"
            opacity="0.6"
          />
          <text
            x="580"
            y="910"
            textAnchor="middle"
            fill="rgba(23, 23, 22, 0.22)"
            fontSize="8"
            fontFamily="var(--font-sans)"
            fontWeight="700"
            letterSpacing="0.18em"
          >
            SRI LANKA
          </text>

          <path
            d={stateGeometries.karnataka}
            fill={activeStateFilter === 'karnataka' || activeStateFilter === 'all' ? '#EAE4D6' : '#F4F0E8'}
            stroke="rgba(23, 23, 22, 0.26)"
            strokeWidth={activeStateFilter === 'karnataka' ? '2' : '1.25'}
            className="transition-colors duration-300"
          />

          <path
            d={stateGeometries.andhraPradesh}
            fill={activeStateFilter === 'andhra-pradesh' || activeStateFilter === 'all' ? '#ECE6D9' : '#F4F0E8'}
            stroke="rgba(23, 23, 22, 0.26)"
            strokeWidth={activeStateFilter === 'andhra-pradesh' ? '2' : '1.25'}
            className="transition-colors duration-300"
          />

          <path
            d={stateGeometries.kerala}
            fill={activeStateFilter === 'kerala' || activeStateFilter === 'all' ? '#E2DBD0' : '#F4F0E8'}
            stroke="rgba(23, 23, 22, 0.28)"
            strokeWidth={activeStateFilter === 'kerala' ? '2' : '1.25'}
            className="transition-colors duration-300"
          />

          <path
            d={stateGeometries.tamilNadu}
            fill={activeStateFilter === 'tamil-nadu' || activeStateFilter === 'all' ? '#E8E1D2' : '#F4F0E8'}
            stroke="rgba(23, 23, 22, 0.32)"
            strokeWidth={activeStateFilter === 'tamil-nadu' ? '2.2' : '1.5'}
            className="transition-colors duration-300"
          />
        </g>

        <g id="topography-group" pointerEvents="none">
          <path
            d="M 230 515 C 275 570, 310 595, 345 635 C 355 650, 365 690, 375 730 C 385 765, 385 810, 395 865 C 400 885, 404 895, 407 904"
            fill="none"
            stroke="rgba(110, 57, 36, 0.12)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 230 515 C 275 570, 310 595, 345 635 C 355 650, 365 690, 375 730 C 385 765, 385 810, 395 865 C 400 885, 404 895, 407 904"
            fill="none"
            stroke="rgba(23, 23, 22, 0.16)"
            strokeWidth="1.2"
            strokeDasharray="2 4"
          />
          <text x="330" y="628" fontSize="8" opacity="0.35">⛰️</text>
          <text x="365" y="735" fontSize="8" opacity="0.35">⛰️</text>
          <text x="375" y="805" fontSize="8" opacity="0.35">⛰️</text>
          <text
            x="335"
            y="675"
            fill="rgba(110, 57, 36, 0.4)"
            fontSize="7.5"
            fontFamily="var(--font-sans)"
            fontWeight="700"
            letterSpacing="0.12em"
            transform="rotate(-75 335 675)"
          >
            WESTERN GHATS RANGE
          </text>

          <path
            d="M 305 590 C 350 605, 395 625, 440 645 C 485 665, 530 685, 570 705"
            fill="none"
            stroke="#5B8296"
            strokeWidth="1.2"
            opacity="0.45"
            strokeLinecap="round"
          />
          <text x="490" y="668" fill="#5B8296" fontSize="6.5" fontFamily="var(--font-sans)" fontWeight="600" opacity="0.6">
            Kaveri River
          </text>

          <path
            d="M 390 762 C 415 762, 444 762, 475 778 C 500 790, 515 800, 525 805"
            fill="none"
            stroke="#5B8296"
            strokeWidth="1.1"
            opacity="0.5"
            strokeLinecap="round"
          />
          <text x="462" y="773" fill="#5B8296" fontSize="6" fontFamily="var(--font-sans)" fontWeight="600" opacity="0.6">
            Vaigai River
          </text>
        </g>

        <g opacity="0.3" fontFamily="var(--font-sans)" fontWeight="800" letterSpacing="0.2em" fontSize="11" fill="#171716">
          <text x="495" y="625" textAnchor="middle">TAMIL NADU</text>
          <text x="315" y="750" textAnchor="middle" transform="rotate(-80 315 750)">KERALA</text>
          <text x="335" y="380" textAnchor="middle">KARNATAKA</text>
          <text x="590" y="370" textAnchor="middle">ANDHRA PRADESH</text>
        </g>

        <g fill="rgba(23, 23, 22, 0.22)" fontSize="8.5" fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="0.22em">
          <text x="180" y="620" transform="rotate(-88 180 620)">ARABIAN SEA</text>
          <text x="760" y="520" transform="rotate(88 760 520)">BAY OF BENGAL</text>
          <text x="407" y="960" textAnchor="middle">INDIAN OCEAN</text>
          <text x="545" y="785" fontSize="7" letterSpacing="0.14em">PALK STRAIT</text>
          <text x="480" y="865" fontSize="7" letterSpacing="0.14em">GULF OF MANNAR</text>
        </g>

        <g transform="translate(200, 160)" opacity="0.45">
          <circle r="18" fill="none" stroke="#171716" strokeWidth="0.75" strokeDasharray="2 2" />
          <polygon points="0,-18 3,-4 0,0 -3,-4" fill="#A65F43" />
          <polygon points="0,18 3,4 0,0 -3,4" fill="#171716" />
          <polygon points="18,0 4,3 0,0 4,-3" fill="#171716" />
          <polygon points="-18,0 -4,3 0,0 -4,-3" fill="#171716" />
          <text x="0" y="-21" textAnchor="middle" fontSize="7.5" fontWeight="800" fontFamily="var(--font-mono)" fill="#A65F43">N</text>
        </g>

        <g id="highway-network">
          {routes.map((route) => {
            const isCurrentSelected = route.toNodeId === selectedNodeId;
            if (isCurrentSelected) return null;

            return (
              <g key={route.id} opacity="0.3">
                <path
                  d={route.svgPath}
                  fill="none"
                  stroke="#171716"
                  strokeWidth="1.2"
                  strokeDasharray="2 3"
                  className="transition-all duration-300"
                />
              </g>
            );
          })}

          {activeRoute && selectedNodeId !== 'madurai' && (
            <g id="active-route-highlight" filter="url(#routeGlow)">
              <path
                d={activeRoute.svgPath}
                fill="none"
                stroke="rgba(166, 95, 67, 0.25)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d={activeRoute.svgPath}
                fill="none"
                stroke="#A65F43"
                strokeWidth="2.75"
                strokeLinecap="round"
              />
              <path
                d={activeRoute.svgPath}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                strokeLinecap="round"
                className="animate-route-flow"
              />
            </g>
          )}
        </g>

        {nodes.map((node) => {
          const isSelected = node.id === selectedNodeId;
          const isVisible = isNodeVisible(node);
          const { x, y } = node.coordinates;
          const icon = node.categoryIcon || '📍';

          const isLeftAligned =
            node.id === 'coorg' ||
            node.id === 'ooty' ||
            node.id === 'thekkady' ||
            node.id === 'munnar';

          const labelText = node.isOrigin ? 'MADURAI (ORIGIN DEPOT)' : node.name;
          const labelWidth = labelText.length * 6.4 + 26;
          const rectX = isLeftAligned ? -(labelWidth + 10) : 10;
          const textX = isLeftAligned ? -(labelWidth + 4) : 16;

          return (
            <g
              key={node.id}
              transform={`translate(${x}, ${y})`}
              onClick={() => onSelectNode(node)}
              onMouseEnter={() => {
                setHoveredNodeId(node.id);
                onSelectNode(node);
              }}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`cursor-pointer transition-all duration-300 group focus:outline-none ${
                isVisible ? 'opacity-100' : 'opacity-25'
              }`}
              tabIndex={0}
              role="button"
              aria-label={`Select ${node.name}, ${node.state}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectNode(node);
                }
              }}
            >
              {node.isOrigin && (
                <>
                  <circle
                    r="18"
                    fill="none"
                    stroke="#A65F43"
                    strokeWidth="1.2"
                    strokeDasharray="2 3"
                    className="animate-spin-slow"
                  />
                  <circle
                    r="12"
                    fill="rgba(166, 95, 67, 0.15)"
                    stroke="#A65F43"
                    strokeWidth="1"
                  />
                </>
              )}

              {isSelected && !node.isOrigin && (
                <>
                  <circle
                    r="20"
                    fill="none"
                    stroke="#A65F43"
                    strokeWidth="1.5"
                    className="animate-radar-beacon"
                  />
                  <circle
                    r="12"
                    fill="rgba(166, 95, 67, 0.2)"
                    stroke="#A65F43"
                    strokeWidth="1"
                  />
                </>
              )}

              <circle
                r={node.isOrigin ? '7' : isSelected ? '6.5' : '4.5'}
                fill={node.isOrigin ? '#171716' : isSelected ? '#A65F43' : '#171716'}
                stroke="#FFFFFF"
                strokeWidth={isSelected || node.isOrigin ? '2.5' : '1.5'}
                className="transition-transform duration-200 group-hover:scale-125"
              />

              {node.isOrigin && (
                <circle r="3" fill="#A65F43" />
              )}

              <g filter={isSelected ? 'url(#activeGlow)' : 'url(#nodeShadow)'}>
                <rect
                  x={rectX}
                  y="-12"
                  width={labelWidth}
                  height="23"
                  rx="4"
                  fill={
                    node.isOrigin
                      ? '#171716'
                      : isSelected
                      ? '#A65F43'
                      : '#FFFFFF'
                  }
                  stroke={
                    node.isOrigin
                      ? '#A65F43'
                      : isSelected
                      ? '#A65F43'
                      : 'rgba(23, 23, 22, 0.24)'
                  }
                  strokeWidth={isSelected || node.isOrigin ? '1.5' : '1'}
                  className="transition-all duration-200"
                />

                <text
                  x={textX + 2}
                  y="4"
                  fontSize="9.5"
                  className="pointer-events-none select-none"
                >
                  {icon}
                </text>

                <text
                  x={textX + 16}
                  y="3.5"
                  fill={
                    node.isOrigin || isSelected
                      ? '#FFFFFF'
                      : '#171716'
                  }
                  fontSize="10"
                  fontWeight={isSelected || node.isOrigin ? '700' : '600'}
                  fontFamily="var(--font-sans)"
                  letterSpacing="0.02em"
                  className="pointer-events-none"
                >
                  {labelText}
                </text>
              </g>

              {isSelected && !node.isOrigin && (
                <g transform={`translate(${isLeftAligned ? -(labelWidth + 10) : 10}, 15)`} className="animate-step-enter">
                  <rect
                    x="0"
                    y="0"
                    width={node.highwayBadge ? '135' : '110'}
                    height="17"
                    rx="3"
                    fill="#171716"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.5"
                    className="shadow-sm"
                  />
                  <text
                    x="6"
                    y="12"
                    fill="#F2EEE5"
                    fontSize="8"
                    fontWeight="600"
                    fontFamily="var(--font-sans)"
                    letterSpacing="0.04em"
                  >
                    {node.distanceFromMaduraiKm} KM • {node.highwayBadge || node.travelTimeFromMadurai}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
