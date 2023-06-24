import { lastValueFrom, Observable } from "rxjs";

export async function handleAsync<T>(param: Promise<T> | Observable<T>): Promise<[T | null, any | null]> {
  const future = param instanceof Observable ? lastValueFrom(param) : param;

  try {
    const result = await future;
    return [result, null];
  } catch (error) {
    return [null, error];
  }
}
