# create virtual network
resource "azurerm_virtual_network" "titus-vnet" {
    name = "titus-vnet"
    address_space = ["10.0.0.0/16"]
    location = var.location
    resource_group_name = var.resource_group_name
    ##You need create a subnet in VNet.
    #subnet {
    #    name = "titus-subnet"
    #    address_prefix = "10.0.10.0/24"
    #}
} 

resource "azurerm_subnet" "titus-subnet" {
  name                 = "titus-subnet"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.titus-vnet.name
  address_prefixes     = ["10.0.1.0/24"]

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