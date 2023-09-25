import React from "react"
import { Container, Nav, Alert } from "react-bootstrap"

export function PaymentComplete() {
	return (
		<Container style={{ marginTop: "75px" }}>
			<Alert variant="primary">Thank you. Your order has been processed</Alert>
			<Nav.Link href="/">
				Continue Shopping
			</Nav.Link>
		</Container>
	)
}