import {supabase} from "@/src/utils/supabase";

const API_URL = 'http://10.0.2.2:3000' // change later

export async function apiFetch(
    path: string,
    options: RequestInit = {}
) {
    // 1. Get the current session
    const {
        data: { session },
    } = await supabase.auth.getSession()

    const accessToken = session?.access_token

    // 2. Attach Authorization header
    const headers = {
        'Content-Type': 'application/json',
        ...(accessToken && {
            Authorization: `Bearer ${accessToken}`,
        }),
        ...(options.headers || {}),
    }

    // 3. Make request
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    })

    return response
}