/**
 * Roadmap Student Progress & Quiz Persistence Engine
 * Uses browser localStorage with a unified schema:
 * aura_roadmap_progress: {
 *   [trackId]: {
 *     lastActiveSectionId: string,
 *     sections: {
 *       [sectionId]: {
 *         completed: boolean,
 *         score: number,
 *         total: number,
 *         percentage: number,
 *         passed: boolean,
 *         lastAttempt: string (ISO date)
 *       }
 *     }
 *   }
 * }
 */

const STORAGE_KEY = 'aura_roadmap_progress';
const PASS_THRESHOLD = 70; // 70% required to mark as passed

window.RoadmapProgress = {
    // Retrieve full store
    getAllProgress() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            console.error('Failed to load roadmap progress from localStorage', e);
            return {};
        }
    },

    // Save full store
    _saveAll(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Failed to persist roadmap progress to localStorage', e);
        }
    },

    // Get progress record for a specific track
    getTrackProgress(trackId) {
        const all = this.getAllProgress();
        return all[trackId] || { lastActiveSectionId: null, sections: {} };
    },

    // Save last active track and section for seamless resume
    saveLastActive(trackId, sectionId) {
        const all = this.getAllProgress();
        if (!all[trackId]) all[trackId] = { lastActiveSectionId: null, sections: {} };
        all[trackId].lastActiveSectionId = sectionId;
        localStorage.setItem('aura_last_active_track', trackId);
        this._saveAll(all);
    },

    getLastActiveTrack() {
        return localStorage.getItem('aura_last_active_track') || null;
    },

    // Record a completed quiz attempt
    saveQuizAttempt(trackId, sectionId, score, total) {
        const all = this.getAllProgress();
        if (!all[trackId]) all[trackId] = { lastActiveSectionId: null, sections: {} };
        if (!all[trackId].sections) all[trackId].sections = {};

        const percentage = Math.round((score / total) * 100);
        const passed = percentage >= PASS_THRESHOLD;

        all[trackId].sections[sectionId] = {
            completed: true,
            score,
            total,
            percentage,
            passed,
            lastAttempt: new Date().toISOString()
        };

        this._saveAll(all);
        return all[trackId].sections[sectionId];
    },

    // Get progress of a specific section
    getSectionProgress(trackId, sectionId) {
        const track = this.getTrackProgress(trackId);
        return track.sections ? track.sections[sectionId] || null : null;
    },

    // Calculate total track progress stats
    computeTrackStats(trackId, totalSectionsCount) {
        const track = this.getTrackProgress(trackId);
        const sections = track.sections || {};
        const completedKeys = Object.keys(sections);

        const passedCount = completedKeys.filter(k => sections[k].passed).length;
        const totalCount = totalSectionsCount || Math.max(completedKeys.length, 1);
        const progressPercentage = Math.round((passedCount / totalCount) * 100);

        return {
            passedCount,
            totalCount,
            progressPercentage,
            isTrackComplete: passedCount >= totalCount && totalCount > 0
        };
    },

    // Reset progress for a track (useful for retrying or testing)
    resetTrackProgress(trackId) {
        const all = this.getAllProgress();
        if (all[trackId]) {
            delete all[trackId];
            this._saveAll(all);
        }
    }
};