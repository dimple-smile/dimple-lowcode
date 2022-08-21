<script>
import { FormItem } from '../../../components/form'
export default {
  extends: FormItem,
  props: {
    ...FormItem.props,
    label: { type: String, default: '' },
    labelLength: { type: [Number, String], default: 0 },
    marginBottom: { type: [Number, String], default: '0px' },
  },
}
</script>
