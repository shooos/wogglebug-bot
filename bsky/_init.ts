interface BskyFunctions {
    createSession: () => string;
    uploadImage: (token: string, blob: GoogleAppsScript.Base.Blob) => GoogleAppsScript.Base.Blob | null;
}

const Bsky: Partial<BskyFunctions> = {};
