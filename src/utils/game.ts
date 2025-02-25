export function getVocationName(vocationId: number): string {
  const vocations: { [key: number]: string } = {
    1: 'Master Sorcerer',
    2: 'Elder Druid',
    3: 'Royal Paladin',
    4: 'Elite Knight'
  }
  return vocations[vocationId] || 'Unknown'
}

export function getVocationAssets(vocation: number): { name: string; gif: string } {
  const vocations: { [key: number]: { name: string; gif: string } } = {
    1: { name: 'Master Sorcerer', gif: '/images/vocations/sorcerer.gif' },
    2: { name: 'Elder Druid', gif: '/images/vocations/druid.gif' },
    3: { name: 'Royal Paladin', gif: '/images/vocations/paladin.gif' },
    4: { name: 'Elite Knight', gif: '/images/vocations/knight.gif' }
  }
  return vocations[vocation] || { name: 'Unknown', gif: '/images/vocations/unknown.gif' }
}