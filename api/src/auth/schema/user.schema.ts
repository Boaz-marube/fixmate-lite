import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { UserType } from 'src/auth/enums/userTypes.enum';
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: false })
  specialization: string;

  @Prop({ required: true, enum: UserType, default: UserType.CUSTOMER })
  userType: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
  roleId: Types.ObjectId;

  // Fixer-specific fields
  @Prop({ required: false, type: [String] })
  skills: string[];

  @Prop({ required: false })
  experienceYears: number;

  @Prop({ required: false })
  serviceArea: string;

  @Prop({ required: false })
  nationalId: string;

  @Prop({ required: false })
  description: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
