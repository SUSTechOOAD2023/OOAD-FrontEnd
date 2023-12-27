'use server'

import { revalidateTag } from "next/cache"

const debug = process.env.debug
const path = process.env.path
export async function getTeacherID(id: number): Promise<number> {
    try {
        const response = await fetch(`${path}/teacher/getTeacherID?accountID=${id}`, { method: 'POST' });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        return Number(data);
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to get teacher ID for account ID ${id}: ${error.message}`);
    }
}


