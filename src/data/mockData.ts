import { User, Transaction } from '../types';

export const mockUsers: User[] = [
  {"id":1,"email":"john.smith@email.com","name":"John Sm"},
  {"id":2,"email":"sarah.johnson@email.com","name":"Sarah Johnson"},
  {"id":3,"email":"mike.wilson@email.com","name":"Mike Wilson"},
  {"id":4,"email":"emma.davis@email.com","name":"Emma Davis"},
  {"id":5,"email":"robert.brown@email.com","name":"Robert Brown"},
  {"id":6,"email":"lisa.garcia@email.com","name":"Lisa Garcia"},
  {"id":7,"email":"david.miller@email.com","name":"David Miller"},
  {"id":8,"email":"jennifer.lee@email.com","name":"Jennifer Lee"},
  {"id":9,"email":"chris.anderson@email.com","name":"Chris Anderson"},
  {"id":10,"email":"amanda.taylor@email.com","name":"Amanda Taylor"},
  {"id":11,"email":"kevin.martinez@email.com","name":"Kevin Martinez"},
  {"id":12,"email":"rachel.white@email.com","name":"Rachel White"},
  {"id":13,"email":"alex.thompson@email.com","name":"Alex Thompson"},
  {"id":14,"email":"maria.rodriguez@email.com","name":"Maria Rodriguez"},
  {"id":15,"email":"james.williams@email.com","name":"James Williams"},
  {"id":16,"email":"sophia.chen@email.com","name":"Sophia Chen"},
  {"id":17,"email":"daniel.kim@email.com","name":"Daniel Kim"},
  {"id":18,"email":"olivia.jones@email.com","name":"Olivia Jones"},
  {"id":19,"email":"michael.davis@email.com","name":"Michael Davis"},
  {"id":20,"email":"emily.wilson@email.com","name":"Emily Wilson"},
  {"id":21,"email":"ryan.moore@email.com","name":"Ryan Moore"},
  {"id":22,"email":"ashley.taylor@email.com","name":"Ashley Taylor"},
  {"id":23,"email":"brandon.jackson@email.com","name":"Brandon Jackson"},
  {"id":24,"email":"hannah.martin@email.com","name":"Hannah Martin"},
  {"id":25,"email":"tyler.lee@email.com","name":"Tyler Lee"},
  {"id":26,"email":"madison.garcia@email.com","name":"Madison Garcia"}
];

export const mockTransactions: Transaction[] = [
  {"id":1,"user_id":1,"amount":45.99,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":2,"user_id":2,"amount":1500,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":3,"user_id":3,"amount":23.5,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":4,"user_id":4,"amount":89.99,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":5,"user_id":5,"amount":2500,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":6,"user_id":6,"amount":156.78,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":7,"user_id":7,"amount":899.99,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":8,"user_id":8,"amount":3200,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":9,"user_id":9,"amount":67.4,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":10,"user_id":10,"amount":1200,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":11,"user_id":11,"amount":34.99,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":12,"user_id":12,"amount":750,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":13,"user_id":1,"amount":800,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":14,"user_id":2,"amount":199.99,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"},
  {"id":15,"user_id":3,"amount":299.99,"status":"completed","created_at":"2025-09-02T23:23:29.24176+00:00"}
];

