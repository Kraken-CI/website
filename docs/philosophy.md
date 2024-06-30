---
title: Philosophy
---

**Kraken CI** operates according to the [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html) philosophy. It focuses on supporting two main phases of a software development workflow: **pre-commit** and **post-commit** phases.

## Pre-commit phase

This phase is when developer or tester prepares code changes, until they are ready for commiting to the production. The goal of the pre-commit phase is to prepare the code changes in such a way, that the risk of **breaking** the production code is minimal.

![Break](/img/crash.png)

Breaking the code usually means: making the build non-compilable or introducing a **regression** to the product quality, functionality or performance.

Not all breaks have equally severe consequences. If they make other team members unable to work or product unusable to the customers, we will act in a highest **emergency** to bring the situation back to normal. Other breaks may be fixed with less urgency.

In the pre-commit phase, the developers and testers have a dilemma to find the right trade-off between the **effort and cost** it takes to bullet-proof their changes and the likelihood that they will cause a severe break to the production.

Engineers are generally not against caring about the **quality** of their code.

![Brain](/img/brain.png)

In environments, where it is ambiguous what to test, how to test, the testing lasts long and needs constant manual supervision, people are not able to focus on the quality of their work. They will spend time not on writing the code, but on fighting the environment and tools.

When each commit brings a tough experience, people will minimize the number of commits by creating **big changes**. With big changes, the risk of breaking the production code increases and the effort of fixing it gets high. The **interdependencies** with other developers start to be a problem - integrating large chunks of code is hard and people race who commits the code first. And the **management** is constantly puzzled why there are so many breaks and how to make the developers own the quality of the product they build.

This is where **Kraken CI** comes and makes a world of difference. It brings a validation environment, where it is easy to choose the right test content, run the tests in a standard way using shared resources, and to receive a clear feedback about what was improved and what was broken. Additionally it brings all the diagnostic data and logs that are needed to effectively fix things, if needed.

![Sun](/img/sun.png)

With significantly reduced effort and cost of proofing changes, the risk of breaking the production code goes down.

When commiting the code becomes effective and engineer's experience is positive, people start making **small and frequent** code changes. This improves their effectiveness and removes the burden of code integration. It also significantly reduces the cost of failure in the production - when things break, fixing small changes is easy or the consequence of reverting them is negligible.

## Post-commit phase

This phase is everything what happens after a code change is commited to the production. The purpose of this phase is to make sure the production code remains stable and not broken. Whatever happens in this phase, it is on an integrated code that will be used to release the products to the customers.

When the pre-commmit phase is ineffective and painful, engineers tend to not care about what happens in the post-commit phase. With ineffective, long post-commit validation that brings ambiguous results, detecting, triaging and relating discovered problems to the code changes that had caused them is also difficult. It happens long after engineers made changes, much too late to stay within their span of attention. What usually happens, there are dedicated people that monitor the post-commit validation and submit defects to the team's bug database. Then, the defects follow their regular lifecycle, that result in new fixes, that follow exactly the same path.

![Hamster](/img/pet.png)

In such environments, the time from introducing a code change that breaks somethings, until this break is fixed, can be as high as weeks or months. During this time, the product remains defective and often unreleasable. When everybody works that way, there is a cumulation of regressions as the release is approaching, that requires formation of task forces and committees to oversee the firefighting.

**Kraken CI** brings effective post-commit validation that can reliably deliver information about the production code. This information is easy to interpret and unambiguous. It presents the current data together with the historical context, so it is easy to spot regressions and improvements and relate them to specific code changes. It reduces the time to feedback to hours or days, so engineers can still observe how their recent changes integrated with the production code, and quickly react to any problems.

![Wheel](/img/wheel.png)

Remember - because of improvements to the pre-commit phase - engineers tend to submit **small changes frequently**, so now the cost of breaking the production code is even more minimized - because it is discovered as soon as possible, quickly targeted and can be effectively remedied. The result is a great improvement in the stability of the production code, that starts to be almost **always releasable**. An extra bonus is a big increase in engineering efficiency, who can focus their efforts on the building product value.

## Impact on culture

**Kraken CI** allows to make a long term shift in the software development culture. An old culture where every stage of the development workflow was a gate focused on making sure that the next stage will not break, if big changes are allowed to pass through the gate. Each break was a catastrophe with severe consequences to all teams and the customers. A culture where every release was a celebrated achievement comparable to climbing Mount Everest and engineers barely delivered on their commitments working overtime.

To a new culture, where small changes quickly pass through the workflow, some of them cause infrequent breaks, but no big deal, because they are fixed quickly enough to often remain unnoticed. The quality of the product is always known and people often do not realize customers get their releases, because it is a normal mode of daily operation, not an unusal event. And engineers have enough time to work on innovations and unique value for their customers.

![Agreement](/img/agreement.png)
