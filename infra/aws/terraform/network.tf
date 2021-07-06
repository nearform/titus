resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  instance_tenancy     = "default"
  enable_dns_hostnames = true
  enable_dns_support   = true

}

data "aws_availability_zones" "available" {}

resource "aws_subnet" "this" {
  for_each = {
    "pub1" : "10.0.1.0/24",
    "pub2" : "10.0.2.0/24",
    "dmz1" : "10.0.11.0/24",
    "dmz2" : "10.0.12.0/24",
    "priv1" : "10.0.21.0/24",
    "priv2" : "10.0.22.0/24",
  }
  vpc_id     = aws_vpc.main.id
  cidr_block = each.value
  availability_zone = "${data.aws_availability_zones.available.names[substr("${each.key}", -1, -1)]}"

  tags = {
    "Name": "${var.default_name}-${each.key}"
  }
}

resource "aws_db_subnet_group" "this" {
  name       = var.default_name
  subnet_ids = [aws_subnet.this["priv1"].id, aws_subnet.this["priv2"].id]
}

resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.main.id
}

resource "aws_eip" "nat" {
  vpc = true
}

resource "aws_nat_gateway" "this" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.this["pub1"].id

  depends_on = [aws_internet_gateway.this]
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "dmz" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route" "public" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.this.id
}

resource "aws_route" "dmz" {
  route_table_id         = aws_route_table.dmz.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.this.id
}

resource "aws_route_table_association" "public" {
  for_each = {
    "pub1" : "10.0.1.0/24",
    "pub2" : "10.0.2.0/24",
  }
  subnet_id      = aws_subnet.this[each.key].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "dmz" {
  for_each = {
    "dmz1" : "10.0.11.0/24",
    "dmz2" : "10.0.12.0/24",
  }
  subnet_id      = aws_subnet.this[each.key].id
  route_table_id = aws_route_table.dmz.id
}