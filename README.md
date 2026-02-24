# Automation Testing 

## Why Separate API and UI Test Frameworks?

API and UI tests can run within a single framework. But separating them into an isolated test framework provides significant advantages in terms of maintainability, performance, and code clarity. 
**API tests** run without browser execution in seconds, with minimal resource consumption, in contrast to UI tests, which require browser execution.
Those 2 test frameworks test 2 completely different applications - not at all related to each other. Combining them into one framework would mix business logic that we should avoid in a test framework (we should create tests against 1 application/domain at a time).
Also maintenance test will be easier in future. **API tests** and **UI tests** need 2 different configurations, libraries, and focus on different types of tests.

## Installation

Both test frameworks follow an identical installation process. Please refer to the specific setup instructions in each folder:

- **[API Tests Installation](./api/README.md#1-installation)** - Install and run API automation tests
- **[UI Tests Installation](./ui/README.md#1-installation)** - Install and run UI automation tests

## Proof of the execution: 
API:
![Proof of the execution API](/executionAPI.png)
UI:
![Proof of the execution API](/executionUI.png)


  