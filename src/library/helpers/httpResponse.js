export async function readResponse(response) {
  const text = response.status === 204 ? '' : await response.text();
  let data;
  if (text) {
    try { data = JSON.parse(text); }
    catch (_) {
      if (response.ok) throw Object.assign(new Error('The API returned invalid JSON'), {status: response.status});
      data = {message: 'The API request failed'};
    }
  }
  if (!response.ok) {
    const details = data && typeof data === 'object' ? data : {};
    throw Object.assign(new Error(details.message || details.detail || 'The API request failed'), details, {status: response.status});
  }
  return data;
}
