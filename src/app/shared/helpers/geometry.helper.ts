import { Point } from '@arcgis/core/geometry';
import Circle from '@arcgis/core/geometry/Circle';

/**
 * Helper functions for geometry operations using ArcGIS API
 */
export class GeometryHelper {
    /**
     * Checks if a point is inside a circle
     * @param point The point to check (can be Point object or [x, y] coordinates)
     * @param circle The ArcGIS Circle geometry
     * @returns boolean indicating if the point is inside the circle
     */
    static isPointInCircle(
        point: Point | [number, number],
        circle: Circle
    ): boolean {
        // Convert array coordinates to Point if necessary
        const checkPoint = Array.isArray(point) ? new Point({ x: point[0], y: point[1] }) : point;
        
        // Use ArcGIS native contains method
        return circle.contains(checkPoint);
    }
} 
