/**
 * MAHALAKSHMI TOUR & TRAVEL — SOUTH INDIA MAP ENGINE
 * Core interactive controller for state filtering, node selection, canvas SVG, and editorial card.
 */

'use client';

import React, { useState } from 'react';
import { MapNode, StateFilterId } from '@/types/map';
import { southIndiaMapData } from '@/lib/data/map';
import { MapStateFilter } from './MapStateFilter';
import { MapCanvas } from './MapCanvas';
import { DestinationInfoPanel } from './DestinationInfoPanel';

interface SouthIndiaMapEngineProps {
  initialNodeId?: string;
}

export function SouthIndiaMapEngine({ initialNodeId = 'munnar' }: SouthIndiaMapEngineProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(initialNodeId);
  const [activeStateFilter, setActiveStateFilter] = useState<StateFilterId>('all');

  const { nodes } = southIndiaMapData;
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1];

  const handleSelectNode = (node: MapNode) => {
    setSelectedNodeId(node.id);
  };

  const handleSelectState = (state: StateFilterId) => {
    setActiveStateFilter(state);
    // If current selected node doesn't belong to the newly active state, pick the first node in that state
    if (state !== 'all') {
      const firstInState = nodes.find((n) => n.stateSlug === state && !n.isOrigin);
      if (firstInState && selectedNode.stateSlug !== state) {
        setSelectedNodeId(firstInState.id);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* State Filter Controls */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <MapStateFilter
          activeState={activeStateFilter}
          onSelectState={handleSelectState}
        />
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-terracotta-500)] animate-pulse" />
          <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">
            CENTRAL OPERATIONAL HUB: MADURAI, TN
          </span>
        </div>
      </div>

      {/* Main Map + Info Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Col: Interactive SVG Map Canvas (7 Cols) */}
        <div className="lg:col-span-7 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] p-4 sm:p-6 flex flex-col justify-between shadow-editorial-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-terracotta-500)] animate-pulse" />
              <span className="type-eyebrow text-[var(--color-terracotta-500)] text-[10px]">
                PENINSULAR HIGHWAY NETWORK
              </span>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">
              CLICK OR HOVER ANY PIN TO VIEW ROUTE
            </span>
          </div>

          <MapCanvas
            selectedNodeId={selectedNodeId}
            activeStateFilter={activeStateFilter}
            onSelectNode={handleSelectNode}
          />

          {/* Quick Destination Pill Selector */}
          <div className="pt-3 border-t border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Quick Select Circuit:
              </span>
              <span className="text-[10px] font-mono text-[var(--color-terracotta-600)]">
                Depot: Madurai (NH 44 / 85 / 87)
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {nodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const icon = node.categoryIcon || '📍';
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => handleSelectNode(node)}
                    className={`px-2.5 py-1.5 rounded-[3px] text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[var(--color-terracotta-500)] text-white font-semibold shadow-xs'
                        : 'bg-white/80 hover:bg-white text-[var(--color-ink-800)] border border-[var(--border-default)] hover:border-[var(--color-terracotta-300)]'
                    }`}
                  >
                    <span className="text-[11px]">{icon}</span>
                    <span>{node.isOrigin ? 'Madurai (Hub)' : node.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Editorial Destination Info Panel (5 Cols) */}
        <div className="lg:col-span-5">
          <DestinationInfoPanel node={selectedNode} />
        </div>
      </div>
    </div>
  );
}

