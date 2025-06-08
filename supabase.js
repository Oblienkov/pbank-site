
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://jlhnzausarkpxbcowsyc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsaG56YXVzYXJrcHhiY293c3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNzgzOTMsImV4cCI6MjA2NDk1NDM5M30.h7AUoCH2CFJ-93902lbtq4YACvYVZW9ca3N7uuWODxU'
export const supabase = createClient(supabaseUrl, supabaseKey)

// Регистрация нового пользователя
export async function registerUser(nickname, email, password) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ nickname, email, password, d: 0, do: 0, db: 0, ng: 0, nf: 0 }])
  return { data, error }
}

// Вход: получаем пользователя по email и паролю
export async function loginUser(email, password) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single()
  return { data, error }
}

// Получить всех пользователей
export async function fetchUsers() {
  const { data, error } = await supabase.from('users').select('*')
  return { data, error }
}

// Обновить баланс
export async function updateUserBalance(id, updates) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
  return { data, error }
}

// Добавить запись в историю
export async function logHistory(userId, action) {
  await supabase.from('history').insert([{ user_id: userId, text: action }])
}
