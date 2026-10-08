# AI Agent Reliability Engineering
## A Hands-On Python Guide to Testing, Evaluating, Debugging, and Recovering Production Agents

Leandro Calado Ferreira

**Working manuscript, version 0.1 — October 8, 2026. Not a publication-ready edition.**

Copyright © 2026 Leandro Calado Ferreira. All rights reserved for editorial text.
The companion Python lab is separately licensed under MIT.

### How to use this manuscript

You need Python 3.11 or later, basic SQL and familiarity with API calls. Start with the free incident lab:
https://github.com/lcaladoferreira/lcaladoferreira/tree/main/agent-reliability-lab

Download the repository, enter `agent-reliability-lab`, and run:

```sh
python -m unittest -v
python lab.py demo
python lab.py evaluate
```

The lab deliberately uses a scripted planner. It proves properties of contracts, execution and recovery under controlled failures. It does not establish language-model accuracy. This manuscript distinguishes implemented exercises from proposed extensions; a proposed extension is not a tested feature.

Twenty regression tests passed on Python 3.11, 3.12 and 3.13 in GitHub Actions on October 8, 2026:
https://github.com/lcaladoferreira/lcaladoferreira/actions/runs/37814681218

Those results describe one code revision and the fixture set. They are not a benchmark of production traffic.

### Contents

1. From Demo Success to Production Reliability
2. Build a Small Agent You Can Actually Test
3. Define Success Before You Run an Evaluation
4. Test Tools, Schemas, and Side Effects
5. Evaluate Multi-Step Tasks and Agent Trajectories
6. Use LLM Judges Without Treating Them as Ground Truth
7. Debug Failures with Traces and Replay
8. Handle Timeouts, Retries, and Duplicate Actions
9. Recover State and Resume Interrupted Work
10. Test Retrieval, Citations, and Access Boundaries
11. Add MCP Tools Without Losing Control
12. Measure Cost, Latency, and Reliability Together
13. Build a CI Gate for Agent Changes
14. Run the Incident Lab
Appendices: failure matrix, release checklist and source notes.


# 1. From Demo Success to Production Reliability

A demonstration answers whether a system can complete a selected task once. An operational claim needs a task definition, a population, failure conditions and an acceptance rule. These are different measurements. A compelling demo may say little about what happens when a worker disappears after changing a database.

Consider an assistant authorized to issue a ten-dollar credit to one synthetic customer. The tool applies the credit, but its response is lost. The caller sees a timeout. A second call applies another credit. The assistant may then report success, and a transcript reviewer may agree. The final account state is nevertheless wrong.

This book starts with that failure because it separates three events often collapsed into one: a request was sent, a domain effect committed, and the caller observed a result. A timeout describes the caller's observation. It does not determine whether the effect occurred.

## Define the boundary of each guarantee

Our laboratory keeps the synthetic credit and the operation receipt in the same SQLite transaction. Inside this boundary, an operation key identifies one authorized action. A second delivery with the same payload returns the prior receipt. A different payload using that key raises a conflict.

This is a narrow, useful guarantee. It is not an exactly-once guarantee across a remote payment API and your local database. If a remote effect commits before your local receipt is written, a worker crash creates an unresolved gap. You need provider-side idempotency, reconciliation, or another explicit recovery protocol.

An engineering claim should always name its boundary. “No duplicate credits for concurrent requests using this key in this ledger” is testable. “The agent is reliable” is incomplete.

## Keep two scoreboards

The task scoreboard measures whether the requested outcome occurred. The invariant scoreboard checks constraints that must hold even when the task does not finish. For our incident, the desired outcome is one approved credit. The invariants include no unauthorized recipient, no changed amount and no duplicate effect for the same action.

A task can fail without breaking an invariant. When the response is lost and the retry budget is exhausted, the runner raises a timeout while one credit exists. Reporting this as a clean failure would erase the committed action. The correct operational state is an uncertain observation requiring lookup or recovery.

## Exercise

Run `python lab.py demo`. Inspect the broken and corrected effect counts. The deliberately unsafe baseline produces two effects; the corrected ledger produces one. Read the trace and identify the missing response between the first attempt and the second.

Do not describe these numbers as production improvement percentages. The incident was constructed to exhibit a known failure. It demonstrates a mechanism, not its prevalence in a deployed system.

## Before moving on

Write one sentence for your own application: “For task X, success means Y, and constraint Z must hold during every failure path.” If you cannot write it without vague words such as helpful, accurate or robust, you do not yet have an operational acceptance rule.


# 2. Build a Small Agent You Can Actually Test

Start with a smaller system than the one you eventually want. A broad autonomous assistant has too many degrees of freedom to explain a failure precisely. Our initial runner accepts a trusted task, receives a proposed tool call, validates it, executes one action and returns a receipt.

The trusted task contains four fields: task identifier, tenant, customer and amount in cents. The proposal contains a tool name and arguments. The proposal may have the correct shape while still requesting an unauthorized customer. Structural validity and authorization therefore require separate checks.

## The planner-executor seam

The function `scripted_proposal` produces a deterministic proposal. The runner accepts an explicit proposal, so a future model adapter can use the same seam. No model decides the tenant, approval state, task identifier or operation key.

That design makes the test boundary concrete. You can inject a wrong customer without asking a model to misbehave. You can inject a lost response without causing a network outage. You can test concurrency without paying for model calls.

A scripted planner is a fixture, not a realistic substitute for a probabilistic planner. It is useful because the execution contract should behave correctly regardless of which model, person or service proposed the action.

## Inspect the smallest task

```python
task = {
    "task_id": "credit-001",
    "tenant": "demo",
    "customer": "synthetic-001",
    "amount_cents": 1000,
}
```

Amounts use integer cents. The validator rejects booleans explicitly: in Python, a boolean can otherwise satisfy an integer type relationship. It also rejects zero, negative values, strings, floats and amounts beyond the laboratory's policy limit.

The exact field set is intentional. An extra `approval=True` field in a model proposal is not treated as authorization. Trusted authorization belongs outside generated arguments.

## An adapter should return a proposal, not execute it

For a real model adapter, record the model identifier, prompt revision, sampling settings, tool specification and raw response before normalization. Parse the response into the proposal contract. Pass the normalized proposal to the same validator.

Do not silently fix an unauthorized customer or amount. That would blur model behavior and executor behavior. Record a contract or policy rejection, then apply an explicit repair policy if the application supports one.

The adapter is an extension in this version. No live-model results are claimed. A reproducible implementation needs a selected provider, pinned client version, synthetic evaluation tasks and a recorded run.

## Exercise

Run the `test_wrong_tenant_before_effect` and `test_unknown_tool` tests. Confirm that rejection occurs before the ledger changes. Then inspect `validate_proposal` and identify where trusted task data controls the action.

The design goal is a replaceable planner and a stable execution boundary. You should be able to change the model without rewriting the authorization rules.


# 3. Define Success Before You Run an Evaluation

An evaluation dataset encodes a decision. It does not become authoritative because it is stored in JSON. First determine what evidence distinguishes a completed task from a plausible answer.

For a synthetic credit task, inspect the ledger. A success message is supporting evidence, not the source of truth. For an information task, a relevant citation may support the answer, but the citation must resolve to a document the caller is allowed to access.

## Separate outcomes from acceptance rules

Our contract evaluator includes six cases. One proposal should be accepted. Unknown tools, wrong customers, wrong tenants, inflated amounts and extra arguments should be rejected. The evaluator checks whether actual acceptance matches expected acceptance.

A score of six out of six means the validator behaved as expected on six fixed proposals. It does not imply that a model chooses the right action six out of six times. There are no model calls in that evaluation.

Give every dataset a name and revision. Preserve the input, expected outcome, acceptance rule and reason the case exists. A fixture such as wrong tenant should explain the boundary being tested. Otherwise, someone may remove it as redundant after a refactor.

## Split development from holdout cases

Use development cases to explain failures and improve the implementation. Reserve separate holdout cases for release decisions. When you inspect and tune against a holdout, it becomes part of development evidence. Replace it deliberately rather than pretending it remains unseen.

For a model-backed planner, vary wording while preserving authorized task facts. Include ambiguous requests, unavailable information and conflicting documents. Keep authorization labels in trusted fixture metadata. Never ask the model's own response to define the expected permission boundary.

## Avoid convenient denominators

If an application excludes refused tasks from its success denominator, it may appear to improve by refusing difficult work. Report coverage, accepted-task success and whole-population success separately. Also report failures that violate invariants. A model that completes more tasks by taking unauthorized actions has not improved operationally.

When a case is blocked because an external dependency is unavailable, record the block. Do not count it as a successful no-op, and do not silently delete it from the dataset.

## Exercise

Run `python lab.py evaluate`. Read every case, not only the aggregate count. Change the valid proposal's customer and rerun. Restore the fixture after observing the failed acceptance expectation.

This exercise changes a test input; it is not a benchmark run. The purpose is to prove that the evaluation can fail when expected behavior and observed behavior diverge.

## A release decision

Choose thresholds before examining a candidate revision. For this small contract suite, every invariant test must pass. For stochastic tasks, specify repeated trials, aggregation and review rules. A threshold without a defined task population is a number without a decision.


---
End of working sample. Full edition not yet released.
