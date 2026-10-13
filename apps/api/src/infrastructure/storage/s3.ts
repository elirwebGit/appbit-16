import { S3Client } from "@aws-sdk/client-s3";

/**
 * Cliente S3 compatível com o Neon Object Storage.
 *
 * As credenciais, o endpoint e a região são lidos automaticamente das
 * variáveis AWS_* injetadas pelo Neon:
 *   AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
 *   AWS_ENDPOINT_URL_S3, AWS_REGION
 *
 * O Neon usa endereçamento path-style, por isso `forcePathStyle: true`.
 */
export const s3 = new S3Client({ forcePathStyle: true });

/** Bucket declarado em neon.ts (`buckets.assets`). */
export const STORAGE_BUCKET = process.env.STORAGE_BUCKET ?? "assets";
