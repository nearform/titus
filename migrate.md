Ref
  https://github.com/npm/rfcs/issues/190


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



todo fix:
hint: The '.husky/pre-commit' hook was ignored because it's not set as executable.
hint: You can disable this warning with `git config advice.ignoredHook false`.