export interface Response {
  success: boolean;
  status: number;
  statusText: string;
  url: string;
  headers: any;
  data: any;
}

export default class api {
  public baseUrl: string;

  constructor() {
    this.baseUrl = "https://cors.sjoerd.dev/https://local.backtrack.dev/api/v1";
  }

  /**
   * @param  {string} slug
   * @param  {RequestInit} init?
   * @returns {Promise<Response>} Returns a promise with the {@link Response response}.
   */
  static request = async (
    slug: string,
    init?: RequestInit
  ): Promise<Response> => {
    init = {
      ...init,
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        ...init?.headers,
      },
    };

    // TODO: use baseUrl
    const res = await fetch(
      `https://cors.sjoerd.dev/https://local.backtrack.dev/api/v1${slug}`,
      init
    );
    const newRes = {
      success: res.ok,
      status: res.status,
      statusText: res.statusText,
      url: res.url,
      headers: res.headers,
      data: await res.json(),
    };

    return newRes;
  };

  /**
   * @param  {string} slug
   * @param  {RequestInit} options?
   * @returns {Promise<Response>} Returns a promise with the {@link Response response}.
   */
  static get = async (
    slug: string,
    options?: RequestInit
  ): Promise<Response> => {
    return await api.request(slug, {
      method: "GET",
      ...options,
    });
  };

  /**
   * @param  {string} slug
   * @param  {RequestInit} options?
   * @returns {Promise<Response>} Returns a promise with the {@link Response response}.
   */
  static post = async (
    slug: string,
    options?: RequestInit
  ): Promise<Response> => {
    return await api.request(slug, {
      method: "POST",
      ...options,
    });
  };

  /**
   * @param  {string} slug
   * @param  {RequestInit} options?
   * @returns {Promise<Response>} Returns a promise with the {@link Response response}.
   */
  static put = async (
    slug: string,
    options?: RequestInit
  ): Promise<Response> => {
    return await api.request(slug, {
      method: "PUT",
      ...options,
    });
  };

  /**
   * @param  {string} slug
   * @param  {RequestInit} options?
   * @returns {Promise<Response>} Returns a promise with the {@link Response response}.
   */
  static remove = async (
    slug: string,
    options?: RequestInit
  ): Promise<Response> => {
    return await api.request(slug, {
      method: "DELETE",
      ...options,
    });
  };
}
