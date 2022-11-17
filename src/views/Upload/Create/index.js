import React from "react";
import "./../Upload.scss";
import { BsBook } from "react-icons/bs";
import { Button, Col, Form, Row } from "react-bootstrap";

const Create = () => {
  return (
    <div className="upload-container">
      <div className="main">
        <div className="title">
          <BsBook />
          <div>novel information</div>
        </div>
        <div className="form">
          <Form>
            <Row>
              <Col md={5}>Image</Col>
              <Col md={7}>
                <Form.Group className="mb-3" controlId="createForm.Title">
                  <Form.Label>Tên truyện</Form.Label>
                  <Form.Control type="email" placeholder="Nhập tên truyện" />
                  <Form.Text className="text-muted">Tối đa 70 ký tự.</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="createForm.Description">
                  <Form.Label>Mô tả ngắn gọn</Form.Label>
                  <Form.Control as="textarea" rows={5} />
                </Form.Group>
                <Button variant="outline-primary" type="submit">
                  Tạo mới
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Create;
