<script>
export default {
  name: 'CommonMixin',
  methods: {
    typeIcon(item) {
      switch (item) {
        case 'gh':
          return 'github';
        case 'npm':
          return 'npm';
        default:
          return 'help';
      }
    },
  },
};
</script>
