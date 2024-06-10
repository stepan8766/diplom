from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

reply_keyboard = ReplyKeyboardMarkup(
    keyboard= [
        [
            KeyboardButton(text ="первый текст"),
            KeyboardButton(text ="второй текст")
        ],
        [
            KeyboardButton(text ="третий текст"),
            KeyboardButton(text ="четвертый текст")
        ]
    ],
    resize_keyboard=True,
    # one_time_keyboard=True скрывать клавиатуру после нажатия на button
    input_field_placeholder="Нажмите кнопку",
    selective=True
)

reply_keyboard_contact = ReplyKeyboardMarkup(
    keyboard= [
        [
            KeyboardButton(text ="отправить контакт", request_contact=True),
        ],
        [
            KeyboardButton(text ="назад"),
        ]
    ],
    resize_keyboard=True,
    input_field_placeholder="Нажмите кнопку",
    selective=True
)