/**
 * Holds the consolidated {@link ToolRegistry} after it is built so modules that
 * participate in the consolidated barrel (e.g. batch-manage) can resolve tools
 * without statically importing consolidated-registry (which would create a cycle).
 */
import type { ToolRegistry } from './tool-metadata.js';

let registry: ToolRegistry | null = null;

export function publishConsolidatedToolRegistry(next: ToolRegistry): void {
    registry = next;
}

export function getConsolidatedToolRegistry(): ToolRegistry {
    if (!registry) {
        throw new Error(
            'Consolidated tool registry not initialized; ensure buildConsolidatedRegistry() ran before batch execute_sequence',
        );
    }
    return registry;
}
