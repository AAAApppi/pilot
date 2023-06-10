import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MakePaymentDto } from './dto/make-payment.dto';
import { AuthenticatedGuard } from 'src/ayth/authenticated.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { type } from 'os';
import { MakePaymentResponse } from './types';
import { CheckPaymentDto } from './dto/check-payment.dto';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    @ApiOkResponse({type: MakePaymentResponse})
    @UseGuards(AuthenticatedGuard)
    @Post()
    makePayment(@Body() makePaymentDto: MakePaymentDto) {
        return this.paymentService.makePayment(makePaymentDto);
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/info')
    checkPayment(@Body() checkPaymentDto: CheckPaymentDto) {
        return this.paymentService.checkPayment(checkPaymentDto);
    }
}
