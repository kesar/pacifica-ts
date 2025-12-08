<!-- Source: https://docs.pacifica.fi/api-documentation/api/error-codes -->

### 

[](#http-status-codes-rest-api)

HTTP Status Codes (REST API)

400

Bad Request

403

Forbidden: no access code/restricted region

404

Not Found

409

Conflict

422

Business Logic Error - See below

429

Too Many Requests - Rate limit exceeded

500

Internal Server Error

503

Service Unavailable

504

Gateway Timeout

### 

[](#business-logic-errors-code-422)

Business Logic Errors (Code 422)

0

UNKNOWN

1

ACCOUNT\_NOT\_FOUND

2

BOOK\_NOT\_FOUND

3

INVALID\_TICK\_LEVEL

4

INSUFFICIENT\_BALANCE

5

ORDER\_NOT\_FOUND

6

OVER\_WITHDRAWAL

7

INVALID\_LEVERAGE

8

CANNOT\_UPDATE\_MARGIN

9

POSITION\_NOT\_FOUND

10

POSITION\_TPSL\_LIMIT\_EXCEEDED

### 

[](#websocket-error-codes)

WebSocket Error Codes

200

SUCCESS\_CODE

400

INVALID\_REQUEST\_CODE

401

INVALID\_SIGNATURE\_CODE

402

INVALID\_SIGNER\_CODE

403

UNAUTHORIZED\_REQUEST\_CODE

420

ENGINE\_ERROR\_CODE

429

RATE\_LIMIT\_EXCEEDED\_CODE

500

UNKNOWN\_ERROR\_CODE

[PreviousTick and lot size](/api-documentation/api/tick-and-lot-size)[NextChangelog](/api-documentation/changelog)

Last updated 2 days ago