import { createClient } from '@supabase/supabase-js';
const url = 'https://nlfhgozbqcntvttstigk.supabase.co';
const key = 'sb_publishable_bHDfKCh9Ssnq20-2s1m3Zw_AzFd2qi7';
console.log('Testing with key:', key);
const supabase = createClient(url, key);
(async () => {
  const { data, error, status } = await supabase.from('posts').select('*').limit(1);
  console.log('Result:', { status, error, data });
})();