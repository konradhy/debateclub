# Requirements Document

## Introduction

The Cost Monitoring system tracks every API call and its cost so administrators can understand unit economics - how much each debate, prep generation, or research actually costs vs. what users pay in tokens.

## Glossary

- **API_Call**: Any call to external services (OpenRouter, Vapi, Firecrawl, Gemini)
- **API_Cost**: The actual money paid for an API call
- **Unit_Economics**: Cost of providing a service vs. revenue from tokens
- **Debate_Session**: A complete debate interaction
- **Prep_Generation**: Creating strategy materials for an opponent
- **Research_Session**: Gathering evidence via Firecrawl

## Requirements

### Requirement 1

**User Story:** As an administrator, I want to track the cost of every API call, so that I know exactly how much each service costs me.

#### Acceptance Criteria

1. WHEN any API call is made to OpenRouter, THE System SHALL record the cost of that call
2. WHEN any API call is made to Vapi, THE System SHALL record the cost of that call  
3. WHEN any API call is made to Firecrawl, THE System SHALL record the cost of that call
4. WHEN any API call is made to Gemini, THE System SHALL record the cost of that call

### Requirement 2

**User Story:** As an administrator, I want to see the total cost of a full debate, so that I can compare it to token revenue.

#### Acceptance Criteria

1. WHEN a debate completes, THE System SHALL sum all API costs during that debate
2. THE System SHALL show the total cost for each debate
3. THE System SHALL show which API service was most expensive for each debate

### Requirement 3

**User Story:** As an administrator, I want to see the cost of prep generation, so that I know how much strategy creation costs.

#### Acceptance Criteria

1. WHEN prep generation runs, THE System SHALL track all OpenRouter costs for that generation
2. THE System SHALL track all Firecrawl costs for research during prep
3. THE System SHALL show the total cost per opponent prep generation

### Requirement 4

**User Story:** As an administrator, I want to see cost summaries, so that I can understand spending patterns.

#### Acceptance Criteria

1. THE System SHALL show total daily API costs
2. THE System SHALL show total weekly API costs  
3. THE System SHALL show which users generate the highest API costs
4. THE System SHALL show which debates were most expensive