# Implementation Plan: Cost Monitoring & Control

## Overview

Implement cost tracking for all API calls (OpenRouter, Vapi, Firecrawl, Gemini) by wrapping existing functions, calculating costs using hardcoded pricing tables, and storing cost records for unit economics analysis.

## Tasks

- [x] 1. Research API pricing and create pricing table
  - Research current OpenRouter model pricing for all models used in the system
  - Research current Vapi pricing structure (per-minute costs)
  - Research current Firecrawl pricing (per-request costs)
  - Research current Gemini API pricing structure
  - Create `convex/lib/apiPricing.ts` with accurate pricing data
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Set up cost storage infrastructure
  - [x] 2.1 Add apiCosts table to schema
    - Add apiCosts table definition to `convex/schema.ts`
    - Include all required fields: service, cost, debateId, opponentId, userId, details, timestamp
    - Add indexes for efficient querying by debate, opponent, user, and service
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 2.2 Write property test for cost storage
    - **Property 1: Complete Cost Recording**
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4**

  - [x] 2.3 Create cost calculation helper functions
    - Create `convex/lib/costCalculator.ts` with functions for each service
    - Implement `calculateOpenRouterCost()` for token-based pricing
    - Implement `calculateVapiCost()` for duration-based pricing
    - Implement `calculateFirecrawlCost()` for request-based pricing
    - Implement `calculateGeminiCost()` for API call-based pricing
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 2.4 Write unit tests for cost calculation functions
    - Test each calculation function with known inputs
    - Test edge cases like zero tokens, negative values
    - Test unknown models/services
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 3. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement cost interception for OpenRouter
  - [x] 4.1 Modify OpenRouter API wrapper
    - Update `convex/lib/openrouter.ts` to capture usage data
    - Add cost calculation and recording after each API call
    - Ensure original functionality is preserved
    - _Requirements: 1.1_

  - [ ]* 4.2 Write property test for OpenRouter cost tracking
    - **Property 2: Debate Cost Aggregation**
    - **Validates: Requirements 2.1, 2.2, 2.3**

- [x] 5. Implement cost interception for Vapi
  - [x] 5.1 Modify Vapi webhook handler
    - Update webhook handler in `convex/http.ts` to capture call duration
    - Add cost calculation and recording for completed calls
    - Handle webhook data parsing for duration extraction
    - _Requirements: 1.2_

  - [ ]* 5.2 Write unit tests for Vapi cost tracking
    - Test webhook data parsing
    - Test duration calculation and cost recording
    - _Requirements: 1.2_

- [x] 6. Implement cost interception for Firecrawl
  - [x] 6.1 Modify Firecrawl API wrapper
    - Update `convex/lib/firecrawl.ts` to track request counts
    - Add cost calculation and recording after each scraping operation
    - Handle both single requests and batch operations
    - _Requirements: 1.3_

  - [ ]* 6.2 Write property test for Firecrawl cost tracking
    - **Property 3: Prep Cost Tracking**
    - **Validates: Requirements 3.1, 3.2, 3.3**

- [x] 7. Implement cost interception for Gemini
  - [x] 7.1 Modify Gemini API functions
    - Update functions in `convex/lib/geminiDeepResearch.ts` to track API calls
    - Add cost calculation and recording after each Gemini operation
    - Handle different Gemini API endpoints if applicable
    - _Requirements: 1.4_

  - [ ]* 7.2 Write unit tests for Gemini cost tracking
    - Test API call counting and cost recording
    - Test different Gemini operation types
    - _Requirements: 1.4_

- [ ] 8. Checkpoint - Ensure all cost interception works
  - Ensure all tests pass, ask the user if questions arise.

- [-] 9. Create admin cost queries
  - [x] 9.1 Implement basic cost queries
    - Create `convex/costs.ts` with admin query functions
    - Implement `getTotalCostsByService()` for service breakdown
    - Implement `getDebateCosts()` for individual debate costs
    - Implement `getMostExpensiveDebates()` for cost ranking
    - Implement `getDailyCosts()` and `getWeeklyCosts()` for time-based analysis
    - _Requirements: 2.1, 2.2, 2.3, 4.1, 4.2, 4.3, 4.4_

  - [ ]* 9.2 Write property test for cost aggregation
    - **Property 4: Cost Summary Accuracy**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4**

  - [ ]* 9.3 Write unit tests for admin queries
    - Test cost aggregation logic
    - Test time-based filtering
    - Test sorting and ranking functions
    - _Requirements: 2.1, 2.2, 2.3, 4.1, 4.2, 4.3, 4.4_

- [ ] 10. Integration and error handling
  - [x] 10.1 Add comprehensive error handling
    - Ensure cost recording failures don't break original API calls
    - Add logging for missing pricing data
    - Handle invalid usage data gracefully
    - Add error recovery for calculation failures
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 10.2 Write integration tests
    - Test end-to-end cost tracking for complete debate sessions
    - Test cost tracking for prep generation workflows
    - Test error scenarios and recovery
    - _Requirements: 2.1, 2.2, 3.1, 3.2, 3.3_

- [ ] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Focus on wrapping existing API calls without breaking current functionality
- Use hardcoded pricing tables that can be updated manually as needed