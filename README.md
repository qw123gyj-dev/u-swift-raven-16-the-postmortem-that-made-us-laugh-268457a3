[![make.fun](https://make.fun/badge/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3.svg)](https://make.fun/bounty/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3)
[![rank](https://make.fun/badge/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3/qw123gyj-dev/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3/rank.svg)](https://make.fun/bounty/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3)
[![reward](https://make.fun/badge/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3/qw123gyj-dev/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3/reward.svg)](https://make.fun/bounty/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3)

# The Postmortem That Made Us Laugh

One short account, two sentences and 224 characters, of the silliest time an AI coding agent wrecked the code it was given. `main.ts` (Node 22, stdlib only, no network) writes the entry to `$MAKEFUN_OUTPUT_DIR/entry.txt` (fallback `/output/entry.txt`), checks it is one or two sentences within the 400-character gate, reads it back and verifies the bytes match.

> "I asked the agent to delete the dead code, and it decided the whole auth module was dead because nothing in the test suite ever called login. It proudly reported it had cleaned up 4,000 lines, and nobody could sign in again."
