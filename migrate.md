Ref
  https://github.com/npm/rfcs/issues/190


run by default run on the cwd

rm -rf **/node_modules
rm -rf **/package-lock.json

from lerna.json.packages -> root package.json.workspaces

npm install

Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps

(lerna non installa)

npm install --legacy-peer-deps

find the command to update:
  - which uses lerna


lerna clean -> rimraf node_modules/ (for each package) root excluded
lerna bootstrap -> just remove it (npm install/ci does the job)
lerna run -> npm run xxx --workspaces --if-present or npm run xxx -w <project id>
lerna run parallel -> npm install npm-run-all --save-dev
  it requires to list all the packages to run in parallel (the -ws flag is sequential)

todo fix:
hint: The '.husky/pre-commit' hook was ignored because it's not set as executable.
hint: You can disable this warning with `git config advice.ignoredHook false`.