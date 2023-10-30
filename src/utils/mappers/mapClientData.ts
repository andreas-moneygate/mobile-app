import icons from 'assets/icons'
import { Client } from 'types/api/user'
import { MappedClient } from 'types/mapped/client'

export const mapClientData = (client: Client): MappedClient => ({
  title: client.name,
  id: client.id,
  icon: icons.client,
})
