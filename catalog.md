# Catalog API Documentation

## Overview

The Catalog API provides public endpoints for browsing and viewing laptops available for sale. All endpoints are publicly accessible (no authentication required) and only return laptops with the `SELLING` state.

## Base URL

```
/catalog
```

## Endpoints

### 1. List Laptops

Retrieves a paginated list of laptops available for sale with optional filtering and sorting.

**Endpoint:** `POST /catalog/laptops`  
**HTTP Status:** `200 OK`  
**Authentication:** Public (no authentication required)

#### Request Body (LaptopListPublicDtoIn)

All fields are optional. If no filters are provided, all selling laptops will be returned.

```typescript
{
  name?: string;              // Filter by laptop name (case-insensitive regex)
  brand?: string;             // Filter by brand (case-insensitive regex)
  model?: string;             // Filter by model (case-insensitive regex)
  screenSize?: number;        // Filter by screen size (exact match)
  panelType?: PanelType;      // Filter by panel type (enum: "tn" | "ips" | "oled")
  ssd?: number;               // Filter by SSD size in GB (exact match)
  ram?: number;               // Filter by RAM size in GB (exact match)
  touch?: boolean;            // Filter by touchscreen capability
  discrete?: boolean;          // Filter by discrete graphics card
  keyLight?: boolean;         // Filter by keyboard backlight
  sorters?: object;           // MongoDB sort object (e.g., { "sellPrice": 1 })
  pageIndex?: number;         // Page number (0-indexed, default: 0)
  pageSize?: number;          // Items per page (default: 20)
}
```

#### Response (LaptopListPublicDtoOut)

```typescript
{
  itemList: LaptopPublicProjection[];
  pageInfo: PageInfo;
}
```

**LaptopPublicProjection:**
```typescript
{
  _id: string;                // MongoDB ObjectId
  code: string;               // Laptop code/identifier
  name: string;               // Laptop name
  brand: string;              // Brand name
  model: string;              // Model name
  submodel: string;           // Submodel variant
  sellPrice: number;          // Selling price
  photoUri: string;           // Main photo URI
  characteristics: {
    processor: string;        // CPU model
    videocard: string;        // GPU model
    discrete: boolean;        // Has discrete graphics
    ssd: number;              // SSD size in GB
    ram: number;              // RAM size in GB
    ports: string[];          // Available ports
    screenSize: number;       // Screen size in inches
    resolution: string;       // Screen resolution
    panelType: string;        // Panel type ("tn" | "ips" | "oled")
    refreshRate: string;      // Screen refresh rate
    touch: boolean;           // Touchscreen capability
    keyLight: boolean;        // Keyboard backlight
    battery: number;          // Battery capacity
  };
  defects: string[];          // List of defects/notes
  marketplaces: {
    name: string;             // Marketplace name
  }[];
}
```

**PageInfo:**
```typescript
{
  pageIndex: number;          // Current page index (0-indexed)
  pageSize: number;           // Items per page
  totalCount: number;         // Total number of items matching filters
}
```

#### Example Request

```json
{
  "brand": "Dell",
  "screenSize": 15.6,
  "panelType": "ips",
  "ram": 16,
  "ssd": 512,
  "discrete": true,
  "sorters": { "sellPrice": 1 },
  "pageIndex": 0,
  "pageSize": 20
}
```

#### Example Response

```json
{
  "itemList": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "code": "LAP-001",
      "name": "Dell XPS 15",
      "brand": "Dell",
      "model": "XPS 15",
      "submodel": "9520",
      "sellPrice": 1299.99,
      "photoUri": "https://example.com/photo.jpg",
      "characteristics": {
        "processor": "Intel Core i7-12700H",
        "videocard": "NVIDIA RTX 3050",
        "discrete": true,
        "ssd": 512,
        "ram": 16,
        "ports": ["USB-C", "USB-A", "HDMI"],
        "screenSize": 15.6,
        "resolution": "1920x1080",
        "panelType": "ips",
        "refreshRate": "60Hz",
        "touch": false,
        "keyLight": true,
        "battery": 86
      },
      "defects": [],
      "marketplaces": [
        { "name": "Amazon" }
      ]
    }
  ],
  "pageInfo": {
    "pageIndex": 0,
    "pageSize": 20,
    "totalCount": 1
  }
}
```

---

### 2. Get Laptop

Retrieves detailed information about a specific laptop by ID.

**Endpoint:** `GET /catalog/laptops/:id`  
**HTTP Status:** `200 OK`  
**Authentication:** Public (no authentication required)

#### Path Parameters

- `id` (string, required): MongoDB ObjectId of the laptop

#### Response (LaptopGetPublicDtoOut)

Returns the same structure as `LaptopPublicProjection` (see endpoint 1).

#### Error Responses

- `404 Bad Request`: Laptop not found or not available for sale
  ```json
  {
    "statusCode": 404,
    "message": "Laptop not found or not available for sale.",
    "paramMap": {
      "id": "507f1f77bcf86cd799439011"
    }
  }
  ```

#### Example Request

```
GET /catalog/laptops/507f1f77bcf86cd799439011
```

#### Example Response

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "code": "LAP-001",
  "name": "Dell XPS 15",
  "brand": "Dell",
  "model": "XPS 15",
  "submodel": "9520",
  "sellPrice": 1299.99,
  "photoUri": "https://example.com/photo.jpg",
  "characteristics": {
    "processor": "Intel Core i7-12700H",
    "videocard": "NVIDIA RTX 3050",
    "discrete": true,
    "ssd": 512,
    "ram": 16,
    "ports": ["USB-C", "USB-A", "HDMI"],
    "screenSize": 15.6,
    "resolution": "1920x1080",
    "panelType": "ips",
    "refreshRate": "60Hz",
    "touch": false,
    "keyLight": true,
    "battery": 86
  },
  "defects": [],
  "marketplaces": [
    { "name": "Amazon" }
  ]
}
```

---

### 3. List Laptop Images

Retrieves all images associated with a specific laptop, including signed URLs for direct access.

**Endpoint:** `POST /catalog/laptops/images`  
**HTTP Status:** `200 OK`  
**Authentication:** Public (no authentication required)

#### Request Body (LaptopImagesListDtoIn)

```typescript
{
  laptopId: string;           // MongoDB ObjectId of the laptop (required)
}
```

#### Response

Returns an array of image objects with signed URLs:

```typescript
{
  id: string;                // Image MongoDB ObjectId
  s3Url: string;             // S3 URL of the image
  signedUrl: string;          // Pre-signed URL for temporary access (expires after a period)
}[]
```

#### Example Request

```json
{
  "laptopId": "507f1f77bcf86cd799439011"
}
```

#### Example Response

```json
[
  {
    "id": "507f1f77bcf86cd799439012",
    "s3Url": "https://s3.amazonaws.com/bucket/path/to/image1.jpg",
    "signedUrl": "https://s3.amazonaws.com/bucket/path/to/image1.jpg?X-Amz-Algorithm=..."
  },
  {
    "id": "507f1f77bcf86cd799439013",
    "s3Url": "https://s3.amazonaws.com/bucket/path/to/image2.jpg",
    "signedUrl": "https://s3.amazonaws.com/bucket/path/to/image2.jpg?X-Amz-Algorithm=..."
  }
]
```

**Note:** Signed URLs are temporary and expire after a certain period. Use them immediately for displaying images.

---

## Enums

### PanelType

```typescript
enum PanelType {
  TN = "tn",      // Twisted Nematic
  IPS = "ips",    // In-Plane Switching
  OLED = "oled"   // Organic Light-Emitting Diode
}
```

---

## Data Transfer Objects (DTOs)

### Input DTOs

#### LaptopListPublicDtoIn

Located in: `src/catalog/dto/in/laptop-list-public.ts`

All fields are optional. Used for filtering and paginating laptop listings.

#### LaptopImagesListDtoIn

Located in: `src/catalog/dto/in/laptop-images-list.ts`

- `laptopId` (string, required): Valid MongoDB ObjectId

### Output DTOs

#### LaptopListPublicDtoOut

Located in: `src/catalog/dto/out/laptop-list-public.ts`

Contains:
- `itemList`: Array of `LaptopPublicProjection` objects
- `pageInfo`: Pagination information

#### LaptopGetPublicDtoOut

Located in: `src/catalog/dto/out/laptop-get-public.ts`

Extends `LaptopPublicProjection` with the same structure as items in the list endpoint.

---

## Important Notes

1. **State Filtering**: Only laptops with state `SELLING` are returned by the catalog endpoints.

2. **Field Filtering**: The following fields are excluded from laptop responses for security/privacy:
   - `orderId`
   - `assignee`
   - `stateHistory`
   - `techCheck`
   - `toBuy`
   - `bought`
   - `note`
   - `serviceTag`
   - `limitPrice`
   - `state`
   - `complectation`
   - `marketplaces` (full details)

3. **Image Access**: Images are stored in S3 and accessed via signed URLs that expire after a period. Always use the `signedUrl` from the response for displaying images.

4. **Pagination**: Default pagination is 20 items per page, starting at page index 0.

5. **Filtering**: String filters (name, brand, model) use case-insensitive regex matching. Numeric filters use exact matching.

6. **Sorting**: The `sorters` field accepts MongoDB sort objects. Use `1` for ascending and `-1` for descending order.

---

## Error Handling

All endpoints use standard HTTP status codes:

- `200 OK`: Successful request
- `400 Bad Request`: Invalid input parameters or validation errors
- `404 Not Found`: Resource not found or not available

Error responses follow this format:

```json
{
  "statusCode": number,
  "message": string,
  "paramMap": {
    // Additional context about the error
  }
}
```

