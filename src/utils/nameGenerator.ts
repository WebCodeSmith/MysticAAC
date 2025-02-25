type NameType = 
  | 'dragon'
  | 'elf'
  | 'dwarf'
  | 'human'
  | 'knight'
  | 'wizard'
  | 'villain'
  | 'mythology'

interface GeneratorOptions {
  gender?: 'male' | 'female'
  length?: 'short' | 'medium' | 'long'
}

// Define custom name parts for more variety
const customNames = {
  prefixes: ['Dark', 'Storm', 'Dragon', 'Shadow', 'Iron', 'Frost', 'Thunder', 'Blood', 'Night', 'Star'],
  suffixes: ['blade', 'heart', 'soul', 'fang', 'claw', 'strike', 'slayer', 'bane', 'guard', 'walker']
}

export function generateRandomName(): string {
  // 50% chance to use custom name generation
  if (Math.random() > 0.5) {
    const prefix = customNames.prefixes[Math.floor(Math.random() * customNames.prefixes.length)]
    const suffix = customNames.suffixes[Math.floor(Math.random() * customNames.suffixes.length)]
    return `${prefix}${suffix}`
  }

  // Fallback to simple name generation
  const randomPrefix = customNames.prefixes[Math.floor(Math.random() * customNames.prefixes.length)]
  const randomNumber = Math.floor(Math.random() * 999) + 1
  return `${randomPrefix}${randomNumber}`
}

export function generateNameByType(type: string, gender: 'male' | 'female' = 'male'): string {
  // Always use custom name generation for specific types
  const prefix = customNames.prefixes[Math.floor(Math.random() * customNames.prefixes.length)]
  const suffix = customNames.suffixes[Math.floor(Math.random() * customNames.suffixes.length)]
  return `${prefix}${suffix}`
}