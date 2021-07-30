# create virtual network
resource "azurerm_virtual_network" "titus-vnet" {
    name = "titus-vnet"
    address_space = [var.titus_network_range]
    location = var.location
    resource_group_name = var.resource_group_name
} 

resource "azurerm_subnet" "titus-subnet" {
  name                 = "titus-subnet"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.titus-vnet.name
  address_prefixes     = [var.titus_subnet_range]

  delegation {
    name = "delegation"

    service_delegation {
      name    = "Microsoft.ContainerInstance/containerGroups"
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }
}

resource "azurerm_network_profile" "titus-net-profile" {
  name                = "titus-net-profile"
  location            = var.location
  resource_group_name = var.resource_group_name

  container_network_interface {
    name = "titus-net-nic"

    ip_configuration {
      name      = "titus-ip-config"
      subnet_id = azurerm_subnet.titus-subnet.id
    }
  }
}

resource "azurerm_dns_zone" "titus-dns-public" {
  name                = "${var.titus_domain_name}.com"
  resource_group_name = var.resource_group_name
}
