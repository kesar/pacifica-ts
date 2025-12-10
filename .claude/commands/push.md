---
description: Commit changes, bump version, and publish to GitHub and npm
---

Perform a complete release workflow:

1. **Check for uncommitted changes**:
   - Run `git status` to see if there are any uncommitted changes
   - If there are changes, create a descriptive commit with them

2. **Automatically determine version bump type**:
   - Get the latest git tag to find the last version
   - Analyze commits since the last tag using Conventional Commits:
     - **Major**: If any commit contains "BREAKING CHANGE:", "BREAKING:", or type with "!" (e.g., "feat!:")
     - **Minor**: If any commit starts with "feat:" or "feature:"
     - **Patch**: For "fix:", "chore:", "docs:", "style:", "refactor:", "perf:", "test:", or other commits
   - If no commits since last tag, default to patch
   - Report which version bump was auto-detected and why

3. **Bump the version**:
   - Read current version from package.json
   - Update package.json with the new version based on auto-detected type
   - Commit the version bump with message: "chore: bump version to X.X.X"
   - Create a git tag for the new version (e.g., v2.1.0)

4. **Build the project**:
   - Run `npm run build` to ensure the project builds successfully
   - If build fails, stop and report the error

5. **Push to GitHub**:
   - Push commits to origin/main
   - Push the version tag to origin

6. **Publish to npm**:
   - Run `npm publish` to publish the package
   - Report the published version and provide links

At the end, provide a summary showing:
- Version bump type that was auto-detected
- Version number published
- Link to npm package
- Link to GitHub release

If any step fails, stop the process and report the error to the user.
