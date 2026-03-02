import { listFiles } from "$lib/utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const blogs = await listFiles()

    return {
        blogs
    }
}
