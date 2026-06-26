(() => {
  const OWNER = 'shooos';
  const REPO = 'wogglebug-bot';
  const WORKFLOW_ID = '28211588875';
  const GITHUB_TOKEN = PropertiesService.getScriptProperties().getProperty('GITHUB_ACCESS_TOKEN');
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_ID}/dispatches`;

  Discord.kickGithubAction = () => {
    Logger.log(`Triggering GitHub Action workflow. | URL=${url}`);

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      contentType: "application/json",
      payload: JSON.stringify({ ref: "main" }),
      muteHttpExceptions: true
    };

    try {
      const response = UrlFetchApp.fetch(url, options);
      const responseCode = response.getResponseCode();

      if (responseCode < 300) {
        Logger.log("Successfully triggered GitHub Action workflow.");
      } else {
        Logger.log(`Failed to trigger GitHub Action workflow | Status=${responseCode}, Reason=${response.getContentText()}`);
      }
    } catch (e) {
      Logger.log(`Error occurred while triggering GitHub Action workflow: ${e}`);
    }
  }
})();
